import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { NgxTextDiffModule } from 'ngx-text-diff';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NamespaceListComponent } from './namespaces/namespace-list/namespace-list.component';
import { NamespaceInfoComponent } from './namespaces/namespace-info/namespace-info.component';
import { AppListComponent } from './app-record/app-list/app-list.component';
import { AppCardComponent } from './app-record/app-card/app-card.component';

import { CompareResultComponent } from './comparison/compare-result/compare-result.component';
import { CompareSelectionComponent } from './comparison/compare-selection/compare-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationService } from './services/notification.service';
import { ServerFailureHandler } from './services/server-failure-handler';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProgressInfoService } from './loading/progress-info.service';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerContainerComponent } from './loading/spinner-container/spinner-container.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxTextDiffModule, 
    
    MatFormFieldModule, 
    MatSelectModule,
    MatSnackBarModule, 
    MatProgressSpinnerModule, 

    RouterModule.forRoot([
      { path: '', component: NamespaceListComponent },
      { path: 'app-list/:namespace', component: AppListComponent },
      { path: 'compareto/:namespace/:app/:version', component: CompareSelectionComponent },
      { path: 'compare-result/:app/:namespace/:version', component: CompareResultComponent },
    ]), BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    NamespaceListComponent,
    NamespaceInfoComponent,
    AppListComponent,
    AppCardComponent,
    CompareResultComponent,
    CompareSelectionComponent,
    SpinnerContainerComponent
  ],
  providers: [
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: ServerFailureHandler, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: ProgressInfoService, multi: true }
  ], 
  bootstrap: [ AppComponent ]
})
export class AppModule { }