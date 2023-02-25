import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "./notification.service";
import {Observable} from "rxjs";
import {Subscription} from "../models/models";
import {Config} from "../app.config";

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient,
              private notificationService: NotificationService) { }

  public listAllSubscription(): Observable<Array<Subscription>> {
    return this.http.get<Array<Subscription>>(Config.API.SUBSCRIPTIONS);
  }

  public saveSubscription(payload: Subscription): Observable<any> {
    if (payload.id) {
      return this.http.put<Subscription>(Config.API.SUBSCRIPTIONS.concat(`/${payload.id}`), payload);
    }
    return this.http.post<Subscription>(Config.API.SUBSCRIPTIONS, payload);
  }

  public deleteSubscription(id: number): Observable<any> {
    if (! id) {
      console.error('No id set for delete subscription')
    }
    return this.http.delete(`${Config.API.SUBSCRIPTIONS}/${id}`);
  }

}
