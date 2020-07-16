import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../services/authentication.service";

/** Responsible for setting the token into the header of requests, for authentication purpose */
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

  public static AUTHORIZATION_HEADER = 'Authorization';

  constructor(private service: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.service.getRawToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(AuthInterceptor.AUTHORIZATION_HEADER, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}
