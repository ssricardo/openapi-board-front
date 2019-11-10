import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Comparison } from '../models/models'
import { Observable } from 'rxjs';
import { Config } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {

  constructor(private http: HttpClient) { }

  /** Calls external service to get comparison data */
  public compareApps(firstName: string, firstNamespace: string, firstVersion:string,
    secondName: string, secondNamespace: string, secondVersion:string): Observable<Comparison> {
      // TODO: check everything is not empty

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
}
