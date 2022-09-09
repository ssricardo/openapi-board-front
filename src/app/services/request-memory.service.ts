import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ApiNamespace, QueryResult, RequestMemoryTO} from "../models/models";
import {Config} from "../app.config";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class RequestMemoryService {

  constructor(private http: HttpClient,
			  private notificationService: NotificationService) { }

  private basePath = Config.API.EXAMPLES

  public saveRequest(memory: RequestMemoryTO): Observable<any> {
  	if (! this.validateRequest(memory)) {
  		return throwError('Invalid request');
	}
	if (memory.requestId) {
		return this.http.put<ApiNamespace[]>(this.basePath.concat(`/${memory.requestId}`), memory);
	}
    return this.http.post<ApiNamespace[]>(this.basePath, memory);
  }

	private validateRequest(memory: RequestMemoryTO) {
  		let valid = (memory.title && memory.title.trim().length > 0)
		if (memory.requestId == undefined) {
			valid = valid && (memory.apiName && memory.apiName.trim().length > 0)
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

	public removeRequestMemory(id: number): Observable<any> {
  		return this.http.delete(`${this.basePath}/${id}`);
	}

	public search(filter: string, page: number = 0) : Observable<QueryResult<RequestMemoryTO>> {
  		return this.http.get<QueryResult<RequestMemoryTO>>(this.basePath + `?q=${filter}&pg=${page}`);
	}
}
