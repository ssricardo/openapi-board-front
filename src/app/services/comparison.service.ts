import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Comparison } from '../models/models'
import {Observable, throwError} from 'rxjs';
import { Config } from '../app.config';
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  /** Calls external service to get comparison data */
  public compareApps(firstName: string, firstNamespace: string, firstVersion:string,
    secondName: string, secondNamespace: string, secondVersion:string): Observable<Comparison> {

      if (! this.assertNotBlank(firstName, firstNamespace, firstVersion, secondName, secondNamespace, secondVersion)) {
          return throwError('Invalid fields');
      }

      const body = new HttpParams()
          .set('srcName', firstName)
          .set('srcNs', firstNamespace)
          .set('srcVersion', firstVersion)
          .set('compareName', secondName)
          .set('compareNs', secondNamespace)
          .set('compareVersion', secondVersion);
    return this.http.post<Comparison>(Config.fullPath(Config.API.POST_COMPARE),
      body, {
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
      })
  }

  private assertNotBlank(...str: string[]): boolean {
      str.forEach(s => {
         if (s == undefined || s.trim().length == 0) {
            this.notificationService.showError('One or more values are invalid. Comparison needs [app name, namespace, version] from both sides');
            return false;
         }
      });
      return true;
  }
}
