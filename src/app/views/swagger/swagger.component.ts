import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {AppRegistryService} from "../../services/app-registry.service";
import {ActivatedRoute} from "@angular/router";
import SwaggerUI from 'swagger-ui';
import {Config} from "../../app.config";
import {MatDialog} from "@angular/material/dialog";
import {FormRecordComponent} from "../form-record/form-record.component";
import {HttpMethod, ParameterMemory, RequestMemoryTO} from "../../models/models";
import {AuthenticationService} from "../../services/authentication.service";
import {HttpHeaders} from "@angular/common/http";
import {AuthInterceptor} from "../../auth/auth-interceptor";

/**
 * Wrapper for Swagger UI, adding some customization by manipulating Swaggers DOM
 */

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
})
export class SwaggerComponent implements OnInit, AfterViewInit {

  private options = {
    swaggerOptions: {
      url: 'none'
    }
  }

  constructor(private appService: AppRegistryService,
              private route: ActivatedRoute,
              private el: ElementRef,
              private render: Renderer2,
              private dialog: MatDialog,
              private authService: AuthenticationService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let oabSelfDescribe = this.route.snapshot.queryParamMap.has("self-describe")

    let apiUrl;
    if (! oabSelfDescribe) {
      apiUrl = Config.fullPath(Config.API.GET_API_SOURCE)
          .replace(":namespace", encodeURIComponent(this.route.snapshot.paramMap.get("namespace")))
          .replace(":appName", encodeURIComponent(this.route.snapshot.paramMap.get("app")));
    } else {
      apiUrl = Config.fullPath(Config.API.OAB_DEFINITIONS)
    }
    let ref = this;

    const ui = SwaggerUI({
      url: apiUrl,
      domNode: this.el.nativeElement.querySelector('.swagger-container'),
      deepLinking: false,
      filter: true,
      presets: [
        SwaggerUI.presets.apis
      ],
      responseInterceptor: function() { ref.onSwaggerReady() },
      requestInterceptor: function(request) {
        console.log('Token: ' + ref.authService.getRawToken());
        request.headers[AuthInterceptor.AUTHORIZATION_HEADER] = 'Bearer ' + ref.authService.getRawToken();
        return request;
      }
    });
  }

  public onSwaggerReady() {
    let ref = this;
    setTimeout(function () {
      const els = document.getElementsByClassName("opblock-tag-section");

      const observer = new MutationObserver((mutations) => {
        const eBody = document.querySelectorAll('.opblock-section-header .try-out');

        eBody.forEach((bb, k) => {
          ref.createSaveButton(bb, k);
        });
      });

      Array.from(els).forEach(e => {
        observer.observe(e, {
          subtree: true,
          childList: true
        });
      })
    }, 300);

  }

  public createSaveButton(bb: Element, key: number) {
    let ref = this;
    if (bb.classList.contains('oab-listen')) {
      return;
    }
    bb.classList.add('oab-listen');
    document.createElement('button')
    let btn = document.createElement("button");
    btn.innerHTML = "Save Request";
    btn.classList.add('btn');
    btn.id = 'btSave' + key;

    btn.addEventListener('click', function (e) {
      ref.onSaveRequestClick(e);
    });
    bb.appendChild(btn);
  }

  /* Tightly coupled to UI - Changes on new releases from UI need to be reflected here */
  private onSaveRequestClick (e: MouseEvent) {
    let opParent: Element = e.target as Element;
    while (opParent) {
      if (opParent.classList.contains('opblock')) {
        break;
      }
      opParent = opParent.parentElement;
    }

    let pathElem = opParent.querySelector('.opblock-summary-path');
    let path = pathElem.getAttribute('data-path');

    let methodElem = opParent.querySelector('.opblock-summary-method');
    let method = methodElem.textContent;

    let bodyElement = opParent.querySelector('.body-param');
    let bodyPayload =  (bodyElement) ?  bodyElement.textContent : null;


    let parameters = opParent.querySelectorAll('.opblock-body .parameters tr');
    let paramResult = new Array<ParameterMemory>();

    parameters.forEach((tr, key) => {
      if (tr.getAttribute('data-param-in')) {
        let paramType = tr.getAttribute('data-param-in');
        let paramName = tr.getAttribute('data-param-name');
        if (! paramName) {
          paramName = paramType + ":" + key;
        }

        let pValue = tr.querySelector('input').value;

        paramResult.push({
          name: paramName,
          value: pValue,
          kind: HttpMethod[paramType]
        });
      }
    });

    this.openFormRecord(path, method, bodyPayload, paramResult, new Array<ParameterMemory>());
  }

  private openFormRecord(pPath: string, pMethod: string, pBody: string, params: Array<ParameterMemory>, pHeaders: Array<ParameterMemory>) {
    let inputVal: RequestMemoryTO = {
      path: pPath,
      title: '',
      methodType: HttpMethod[pMethod],
      body: pBody,
      namespace: this.route.snapshot.paramMap.get("namespace"),
      appName: this.route.snapshot.paramMap.get("app"),
      parameters: params,
      requestHeaders: pHeaders
    }

    let dialogRef = this.dialog.open(FormRecordComponent, {
      height: '600px',
      width: '850px',
      data: inputVal
    });
  }

}
