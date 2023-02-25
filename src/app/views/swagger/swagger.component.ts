import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import SwaggerUI from 'swagger-ui';
import {Config, Placeholder} from "../../app.config";
import {MatDialog} from "@angular/material/dialog";
import {SampleFormComponent} from "../form-record/sample-form.component";
import {HttpMethodValue, ParameterMemory, ParameterTypeValue, RequestSampleTO} from "../../models/models";
import {AuthenticationService} from "../../services/authentication.service";
import {AuthInterceptor} from "../../auth/auth-interceptor";
import {NotificationService} from "../../services/notification.service";

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
              private authService: AuthenticationService,
              private notificationService: NotificationService) { }

  private apiId: string;

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.apiId = param.get("apiId");
    })
  }

  ngAfterViewInit(): void {
    let oabSelfDescribe = this.route.snapshot.queryParamMap.has("self-describe")

    let apiUrl;
    if (!oabSelfDescribe) {
      apiUrl = Config.fullPath(Config.API.GET_API_SOURCE)
          .replace(Placeholder.API_ID, this.apiId);
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
    let inputVal: RequestSampleTO = {
      path: pPath,
      title: '',
      methodType: HttpMethodValue.valueOf(pMethod),
      body: pBody ?? undefined,
      sameNamespaceOnly: false,
      apiId: this.apiId,
      parameters: params,
      requestHeaders: pHeaders
    }

    let dialogRef = this.dialog.open(SampleFormComponent, {
      height: '780px',
      width: '950px',
      data: inputVal
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res === 'OK') {
        this.notificationService.showSuccess("Item successfully registered.");
      }
    });
  }

}
