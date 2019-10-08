import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppNamespace, AppRecord } from '../models/models';

/** Responsible for Backend communications */

@Injectable({
  providedIn: 'root'
})
export class AppRegistryService {

  readonly BACKEND_BASE = "/api"; // FIXME

  constructor(private http: HttpClient) { }

  public listNamespaces(): Observable<AppNamespace[]> {
    return this.http.get<AppNamespace[]>(this.BACKEND_BASE + "/namespaces");
  }

  public getAppOnNamespace(nmSpace: String): Observable<AppRecord[]> {
    return this.http.get<AppRecord[]>(this.BACKEND_BASE + '/nm/' + nmSpace);
  }

  // TODO: get app data
}
