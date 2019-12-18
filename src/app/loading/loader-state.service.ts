import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Dispatchs a state about the loader. 
 * Makes the interface between the http interceptor and view component
 */

@Injectable({
  providedIn: 'root'
})
export class LoaderStateService {

  private loaderSubject = new Subject<boolean>();
  loaderState = this.loaderSubject.asObservable();

  constructor() { }

  show() {
    this.loaderSubject.next(true);
  }
  hide() {
    this.loaderSubject.next(false);
  }
}
