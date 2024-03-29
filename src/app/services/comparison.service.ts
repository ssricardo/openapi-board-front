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
    secondNamespace: string, secondVersion:string): Observable<Comparison> {

      if (! this.assertNotBlank(firstName, firstNamespace, firstVersion, secondNamespace, secondVersion)) {
          return throwError('Invalid fields');
      }

      return this.http.get<Comparison>(Config.fullPath(Config.API.POST_COMPARE),
        {
          params: {
            srcName: firstName,
            srcNs: firstNamespace,
            srcVersion: firstVersion,
            compareNs: secondNamespace,
            compareVersion: secondVersion,
          },
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
