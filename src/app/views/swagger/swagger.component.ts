import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {AppRegistryService} from "../../services/app-registry.service";
import {ActivatedRoute} from "@angular/router";
import SwaggerUI from 'swagger-ui';
import {Config, Placeholder} from "../../app.config";
import {MatDialog} from "@angular/material/dialog";
import {FormRecordComponent} from "../form-record/form-record.component";
import {HttpMethod, HttpMethodValue, ParameterMemory, ParameterTypeValue, RequestMemoryTO} from "../../models/models";
import {AuthenticationService} from "../../services/authentication.service";
import {AuthInterceptor} from "../../auth/auth-interceptor";

/**
 * Wrapper for Swagger UI, adding some customization by manipulating Swaggers DOM
 */

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute,
              private el: ElementRef,
              private render: Renderer2,
              private dialog: MatDialog,
              private authService: AuthenticationService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    let oabSelfDescribe = this.route.snapshot.queryParamMap.has("self-describe")

    let apiUrl;
    if (!oabSelfDescribe) {
      apiUrl = Config.fullPath(Config.API.GET_API_SOURCE)
          .replace(Placeholder.NS, encodeURIComponent(this.route.snapshot.paramMap.get("namespace") ?? ""))
          .replace(Placeholder.API_NAME, encodeURIComponent(this.route.snapshot.paramMap.get("app") ?? ""));
    } else {
      apiUrl = Config.fullPath(Config.API.OAB_DEFINITIONS)
    }
    const __this = this;

    const ui = SwaggerUI({
      url: apiUrl,
      domNode: this.el.nativeElement.querySelector('.swagger-container'),
      deepLinking: false,
      filter: true,
      presets: [
        SwaggerUI.presets.apis
      ],
      onComplete: __this.onSwaggerReady(),
      requestInterceptor: function(request: any) {        
        request.headers[AuthInterceptor.AUTHORIZATION_HEADER] = 'Bearer ' + __this.authService.getRawToken();
        return request;
      }
    });
  }

  public onSwaggerReady() {
    let ref = this;
    setTimeout(function () {
      const els = document.getElementsByClassName("opblock-tag-section");

      const observer = new MutationObserver((mutations) => {
        const tryOutBody = document.querySelectorAll('.opblock-section-header .try-out');

        tryOutBody.forEach((bb, k) => {
          ref.createSaveButton(bb, k);
        });
      });

      Array.from(els).forEach(e => {
        observer.observe(e, {
          subtree: true,
          childList: true
        });
      })
    }, 900);

  }

  public createSaveButton(bb: Element, key: number) {
    const ref = this;
    const parent = bb.parentElement!;
    
    // avoid duplicating the button on any change
    if (parent.classList.contains('oab-listen')) {
      return;
    }
    parent.classList.add('oab-listen');
    document.createElement('button')
    const btn = document.createElement("button");
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
    let opParent: Element | null = e.target as Element;
    while (opParent) {
      if (opParent.classList.contains('opblock')) {
        break;
      }
      opParent = opParent.parentElement;
    }

    let pathElem = opParent?.querySelector('.opblock-summary-path');
    let path = pathElem?.getAttribute('data-path');

    let methodElem = opParent?.querySelector('.opblock-summary-method');
    let method = methodElem?.textContent;

    let bodyElement = opParent?.querySelector('.body-param');
    let bodyPayload =  (bodyElement) ?  bodyElement.textContent : null;


    let parameters = opParent?.querySelectorAll('.opblock-body .parameters tr');
    let paramResult = new Array<ParameterMemory>();

    parameters?.forEach((tr, key) => {
      if (tr.getAttribute('data-param-in')) {
        let paramType = tr.getAttribute('data-param-in') ?? "GET";
        let paramName = tr.getAttribute('data-param-name');
        if (! paramName) {
          paramName = paramType + ":" + key;
        }

        let pValue = tr.querySelector('input')?.value ?? "";

        paramResult.push({
          name: paramName,
          value: pValue,
          kind: ParameterTypeValue.valueOf(paramType)
        });
      }
    });

    if (!(path && method)) {
      console.warn("Issue with values for swagger form. Missing one or more of [path, method, body] values.")
    } else {
      this.openFormRecord(path, method, bodyPayload, paramResult, new Array<ParameterMemory>());
    }    
  }

  private openFormRecord(pPath: string, pMethod: string, pBody: string | null, params: Array<ParameterMemory>, pHeaders: Array<ParameterMemory>) {
    let inputVal: RequestMemoryTO = {
      path: pPath,
      title: '',
      methodType: HttpMethodValue.valueOf(pMethod),
      body: pBody ?? undefined,
      namespace: this.route.snapshot.paramMap.get("namespace") ?? "",
      apiName: this.route.snapshot.paramMap.get("app") ?? "",
      parameters: params,
      requestHeaders: pHeaders
    }

    let dialogRef = this.dialog.open(FormRecordComponent, {
      height: '780px',
      width: '950px',
      data: inputVal
    });
  }

}
