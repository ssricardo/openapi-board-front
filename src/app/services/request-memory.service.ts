import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AppNamespace, RequestMemoryInputTO} from "../models/models";
import {Config} from "../app.config";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class RequestMemoryService {

  constructor(private http: HttpClient,
			  private notificationService: NotificationService) { }

  public saveRequest(memory: RequestMemoryInputTO): Observable<any> {
  	if (! this.validateRequest(memory)) {
  		return throwError('Invalid request');
	}
    return this.http.put<AppNamespace[]>(Config.API.PUT_EXAMPLE, memory);
  }

	private validateRequest(memory: RequestMemoryInputTO) {
  		let valid = (memory.title && memory.title.trim().length > 0)
		if (memory.requestId == undefined) {
			valid = valid && (memory.appName && memory.appName.trim().length > 0)
			valid = valid && (memory.namespace && memory.namespace.trim().length > 0)
			valid = valid && (memory.path && memory.path.trim().length > 0)
			valid = valid && (memory.methodType != undefined)
		}

		if (! valid) {
			this.notificationService.showError("One or more required fields are not set. " +
				"The following are required: ( App name, namespace, path, method, title )");
			return false;
		}
		return true;
	}
}
