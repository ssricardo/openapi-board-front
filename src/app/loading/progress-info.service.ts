import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoaderStateService } from './loader-state.service';

@Injectable({
  providedIn: 'root'
})
export class ProgressInfoService implements HttpInterceptor {
  private requestCount = 0;

  constructor(private loaderService: LoaderStateService) { }

  private updateStateIfNeeded() {
    if (this.requestCount == 0) {
      this.loaderService.hide();
    } else {
      this.loaderService.show();
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestCount++;
    this.updateStateIfNeeded();
    return next.handle(req).pipe(
      finalize(() => {
        this.requestCount--;
        this.updateStateIfNeeded();
      } )
    );
    
  }

}
