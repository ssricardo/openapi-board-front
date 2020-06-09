import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { AppValidationError } from '../models/models'

/** 
 * Global handler for errors on http requests.
 * Standalizes handlering and delegates messages to notification service
 */

@Injectable({
  providedIn: 'root'
})
export class ServerFailureHandler implements HttpInterceptor {
  
  constructor(private notificationService: NotificationService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);

        if (err.status == 404) {
          this.notificationService.showError(
            "Error! It was not possible to find a resource on the server. Check the configuration.");
        } else if (err.status >= 400 && err.status < 500) {
            console.warn('Error from server: ' + err)
          let errMsg = err.error;
          let validationErr = this.getAsValidationErr(errMsg);

          if (validationErr) {
            this.notificationService.showWarn(validationErr.cause + ` [Tracking code ${validationErr.code}]`, 7000);
          } else {
            this.notificationService.showWarn('Ops! You may have some invalid values on your request');
          }

          // return;
        } else {          
          this.notificationService.showError('An unexpected issue happened. If it continues, please contact the administrator');
          // return;
        }
        return throwError(err);
    }));
  }

  private getAsValidationErr(inputErr): AppValidationError {
    if (inputErr instanceof Object) {
      if (inputErr.code !== undefined && inputErr.rapp !== undefined) {
        return inputErr as AppValidationError;
      }
    }
    return null;
  }

}
