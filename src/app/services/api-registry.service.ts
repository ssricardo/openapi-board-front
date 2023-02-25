import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiNamespace, ApiRecord } from '../models/models';
import { Config, Placeholder } from '../app.config';

/** Responsible for Backend communications */

@Injectable({
  providedIn: 'root'
})
export class ApiRegistryService {

  constructor(private http: HttpClient) { }

  public listNamespaces(): Observable<string[]> {
    return this.http.get<string[]>(Config.fullPath(Config.API.NAMESPACES));
  }

  public listApiOnNamespace(nmSpace: string): Observable<ApiRecord[]> {
    return this.http.get<ApiRecord[]>(Config.fullPath(Config.API.GET_APIS_ON_NAMESPACE)
      .replace(Placeholder.NS, encodeURIComponent(nmSpace)));
  }

  public getApiRecord(apiId: string): Observable<ApiRecord> {
    return this.http.get<ApiRecord>(
      Config.fullPath(Config.API.GET_API)
        .replace(Placeholder.API_ID, encodeURIComponent(apiId)));
  }

  public getAvailableVersions(apiId: string): Observable<string[]> {
    return this.http.get<string[]>(Config.fullPath(Config.API.GET_APP_VERSION)
      .replace(Placeholder.API_ID, encodeURIComponent(apiId)));
  }

  public getCurrentSource(api: string): Observable<string> {
    return this.http.get<string>(Config.fullPath(Config.API.GET_API_SOURCE)
      .replace(Placeholder.API_ID, encodeURIComponent(api)));
  }
}
