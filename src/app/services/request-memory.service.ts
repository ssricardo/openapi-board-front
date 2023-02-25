import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {ApiNamespace, ParameterType, QueryResult, RequestSampleTO} from "../models/models";
import {Config} from "../app.config";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class RequestMemoryService {

  	constructor(private http: HttpClient,
			  private notificationService: NotificationService) { }

  	private basePath = Config.API.EXAMPLES

	public saveRequest(memory: RequestSampleTO): Observable<any> {
		if (!this.validateRequest(memory)) {
			return throwError(() => new Error('Invalid request'));
		}
		this.assignHeaderField(memory)
		console.debug(memory);

		if (memory.requestId) {
			return this.http.put<RequestSampleTO>(this.basePath.concat(`/${memory.requestId}`), memory);
		}
		return this.http.post<RequestSampleTO>(this.basePath, memory);
	}

	private validateRequest(memory: RequestSampleTO) {
  		let valid = memory?.title?.trim()?.length > 0;
		if (memory.requestId == undefined) {
			valid = valid && memory?.apiId?.trim()?.length > 0;
			valid = valid && memory?.path?.trim()?.length > 0;
			valid = valid && memory.methodType != undefined;
		}

		if (!valid) {
			this.notificationService.showError("One or more required fields are not set. " +
				"The following are required: ( Api name, namespace, path, method, title )");
			return false;
		}
		return true;
	}

	private assignHeaderField(memory: RequestSampleTO) {
		const allParams = memory.parameters ?? []
		memory.requestHeaders = allParams.filter(p => p.kind == ParameterType.HEADER)
		memory.parameters = allParams.filter(p => p.kind != ParameterType.HEADER)
	}

	public removeRequestMemory(id: number): Observable<any> {
  		return this.http.delete(`${this.basePath}/${id}`);
	}

	public search(filter: string, page: number = 0) : Observable<QueryResult<RequestSampleTO>> {
  		return this.http.get<QueryResult<RequestSampleTO>>(this.basePath + `?q=${filter}&pg=${page}`);
	}
}
