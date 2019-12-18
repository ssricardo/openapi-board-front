import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProgressInfoService } from '../progress-info.service';
import { LoaderStateService } from '../loader-state.service';
import { Subscription } from 'rxjs';

/**
 * Displays an indicator executing http requests 
 */
@Component({
  selector: 'app-spinner',
  template: `<mat-progress-spinner mode="indeterminate" diameter="50"
              [ngStyle]="{'display': (showSpinner) ? 'block' : 'none'}">`,
  styleUrls: ['./spinner-container.component.css']
})
export class SpinnerContainerComponent implements OnInit, OnDestroy {

  private showSpinner = false;

  private subscription: Subscription;

  constructor(private service: LoaderStateService) { }

  ngOnInit() {
    this.subscription = this.service.loaderState.subscribe((newState: boolean) => {
      this.showSpinner = newState;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
