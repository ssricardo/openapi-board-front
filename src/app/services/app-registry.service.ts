import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiNamespace, ApiRecord } from '../models/models';
import { Config, Placeholder } from '../app.config';

/** Responsible for Backend communications */

@Injectable({
  providedIn: 'root'
})
export class AppRegistryService {

  constructor(private http: HttpClient) { }

  public listNamespaces(): Observable<ApiNamespace[]> {
    return this.http.get<ApiNamespace[]>(Config.fullPath(Config.API.NAMESPACES));
  }

  public listAppOnNamespace(nmSpace: string): Observable<ApiRecord[]> {
    return this.http.get<ApiRecord[]>(Config.fullPath(Config.API.GET_NAMESPACE)
      .replace(Placeholder.NS, encodeURIComponent(nmSpace)));
  }

  public getAppRecord(nmSpace: string, appName: string): Observable<ApiRecord> {
    return this.http.get<ApiRecord>(
      Config.fullPath(Config.API.GET_APP)
        .replace(Placeholder.NS, encodeURIComponent(nmSpace))
        .replace(Placeholder.API_NAME, encodeURIComponent(appName)));
  }

  public getAvailableVersions(namespace: string, app: string): Observable<string[]> {
    return this.http.get<string[]>(Config.fullPath(Config.API.GET_APP_VERSION)
      .replace(Placeholder.NS, encodeURIComponent(namespace))
      .replace(Placeholder.API_NAME, encodeURIComponent(app)));
  }

  public getCurrentSource(namespace: string, api: string): Observable<string> {
    return this.http.get<string>(Config.fullPath(Config.API.GET_API_SOURCE)
      .replace(Placeholder.NS, encodeURIComponent(namespace))
      .replace(Placeholder.API_NAME, encodeURIComponent(api)));
  }
}
