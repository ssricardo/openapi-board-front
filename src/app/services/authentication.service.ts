import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {LoggedUser, LoginData} from "../models/models";
import {Config} from "../app.config";

import * as jwt_decode from "jwt-decode";

const AUTH_TOKEN = 'auth-token';

/** Responsible for managing the logged user and related communication for logging in */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentToken: string = null;
  public userSubject = new Subject<LoggedUser>();
  private currentUser: LoggedUser = null;

  constructor(private http: HttpClient) { }

  public login(loginData: LoginData): Observable<string> {
    return this.http.post<string>(Config.API.LOGIN, loginData,
        {
            responseType: 'text' as 'json'
        });
  }

  public logout() {
      if (window.sessionStorage.getItem(AUTH_TOKEN)) {
          window.sessionStorage.removeItem(AUTH_TOKEN);
          this.currentToken = null;
          this.currentUser = null;
          this.notifyUserChanged();
          window.location.reload()
      }
  }

  public getRawToken(): string {
      if (! this.currentToken) {
          this.currentToken = window.sessionStorage.getItem(AUTH_TOKEN);
          if (this.currentToken) {
              let jwt = jwt_decode(this.currentToken);
              if (jwt) {
                  this.currentUser = {
                      name: jwt['sub'],
                      roles: jwt['roles']
                  };
                  this.notifyUserChanged();
              }
          }
      }
      return this.currentToken;
  }

  public getUser(): LoggedUser {
      return this.currentUser;
  }

  public storeToken(token: string) {
      window.sessionStorage.setItem(AUTH_TOKEN, token);
      if (token) {
          console.log('Storing user: ' + jwt_decode(token));
      }
  }

    private notifyUserChanged() {
        this.userSubject.next(this.currentUser);
    }
}
