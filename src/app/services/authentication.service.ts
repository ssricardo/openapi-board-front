import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoggedUser, LoginData} from "../models/models";
import {Config} from "../app.config";

const AUTH_TOKEN = 'auth-token';

/** Responsible for managing the logged user and related communication for logging in */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentToken: string = null;

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
          window.location.reload()
      }
  }

  public getRawToken(): string {
      if (! this.currentToken) {
          this.currentToken = window.sessionStorage.getItem(AUTH_TOKEN);
      }
      return this.currentToken;
  }

  public getUser(): LoggedUser {
      let jwt = this.getRawToken();
      if (jwt) {
          return "Logged in";   // TODO get actual user...
      }
  }

  public storeToken(token: string) {
      window.sessionStorage.setItem(AUTH_TOKEN, token);
  }
}
