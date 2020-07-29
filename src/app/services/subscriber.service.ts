import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {Observable} from "rxjs";
import {AlertSubscriber} from "../models/models";
import {Config} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  public listAllSubscription(): Observable<Array<AlertSubscriber>> {
    return this.http.get<Array<AlertSubscriber>>(Config.API.SUBSCRIPTIONS);
  }

  public saveSubscription(payload: AlertSubscriber): Observable<any> {
    return this.http.put<AlertSubscriber>(Config.API.SUBSCRIPTIONS, payload);
  }

  public deleteSubscription(id: number): Observable<any> {
    if (! id) {
      console.error('No id set for delete subscription')
    }
    return this.http.delete(`${Config.API.SUBSCRIPTIONS}/${id}`);
  }

}
