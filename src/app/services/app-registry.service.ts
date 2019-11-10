import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppNamespace, AppRecord } from '../models/models';
import { Config } from '../app.config';

/** Responsible for Backend communications */

@Injectable({
  providedIn: 'root'
})
export class AppRegistryService {

  constructor(private http: HttpClient) { }

  public listNamespaces(): Observable<AppNamespace[]> {
    return this.http.get<AppNamespace[]>(Config.fullPath(Config.API.NAMESPACES));
  }

  public listAppOnNamespace(nmSpace: string): Observable<AppRecord[]> {
    return this.http.get<AppRecord[]>(Config.fullPath(Config.API.GET_NAMESPACE)
      .replace(':namespace', encodeURIComponent(nmSpace)));
  }

  public getAppRecord(nmSpace: string, appName: string): Observable<AppRecord> {
    return this.http.get<AppRecord>(
      Config.fullPath(Config.API.GET_APP)
        .replace(':namespace', encodeURIComponent(nmSpace))
        .replace(':appName', encodeURIComponent(appName)));
  }

  public getAvailableVersions(namespace: string, app: string): Observable<string[]> {
    return this.http.get<string[]>(Config.fullPath(Config.API.GET_APP_VERSION)
      .replace(':namespace', encodeURIComponent(namespace))
      .replace(':appName', encodeURIComponent(app)));
  }
}
