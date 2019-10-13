import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppNamespace, AppRecord } from '../models/models';
import config from '../../api-config.json';

/** Responsible for Backend communications */

@Injectable({
  providedIn: 'root'
})
export class AppRegistryService {

  constructor(private http: HttpClient) { }

  public listNamespaces(): Observable<AppNamespace[]> {
    return this.http.get<AppNamespace[]>(config.path + config.apis.namespaces);
  }

  public listAppOnNamespace(nmSpace: string): Observable<string[]> {
    return this.http.get<string[]>(config.path + 
      config.apis.getNamespace.replace(':namespaceName', encodeURIComponent(nmSpace)));
  }

  public getAppRecord(nmSpace: string, appName: string): Observable<AppRecord> {
    return this.http.get<AppRecord>(config.path + 
      config.apis.getNamespace
        .replace(':namespaceName', encodeURIComponent(nmSpace))
        .replace(':appName', encodeURIComponent(appName)));
  }
}
