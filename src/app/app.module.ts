import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxTextDiffModule} from 'ngx-text-diff';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import {AppComponent} from './app.component';
import {TopBarComponent} from './views/top-bar/top-bar.component';
import {NamespaceListComponent} from './views/namespaces/namespace-list/namespace-list.component';
import {NamespaceInfoComponent} from './views/namespaces/namespace-info/namespace-info.component';
import {AppListComponent} from './views/app-record/app-list/app-list.component';
import {AppCardComponent} from './views/app-record/app-card/app-card.component';

import {CompareResultComponent} from './views/comparison/compare-result/compare-result.component';
import {CompareSelectionComponent} from './views/comparison/compare-selection/compare-selection.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NotificationService} from './services/notification.service';
import {ServerFailureHandler} from './services/server-failure-handler';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ProgressInfoService} from './loading/progress-info.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SpinnerContainerComponent} from './loading/spinner-container/spinner-container.component';
import {SwaggerComponent} from './views/swagger/swagger.component';
import {FormRecordComponent} from './views/form-record/form-record.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MemoryListComponent} from './views/memory-list/memory-list.component';
import {MatTableModule} from "@angular/material/table";
import {ConfirmDialogComponent} from "./confirm-dialog/ConfirmDialogComponent";
import {MatButtonModule} from "@angular/material/button";
import {HomeComponent} from './home/home.component';
import { ParametersViewComponent } from './views/parameters-view/parameters-view.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,

    NgxTextDiffModule,

    // Material
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,

    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'namespaces', component: NamespaceListComponent},
      {path: 'app-list/:namespace', component: AppListComponent},
      {path: 'compareto/:namespace/:app/:version', component: CompareSelectionComponent},
      {path: 'compare-result/:app/:namespace/:version', component: CompareResultComponent},
      {path: 'req-memory-form', component: FormRecordComponent},
      {path: 'memory-list', component: MemoryListComponent},
      {path: 'swagger/:namespace/:app', component: SwaggerComponent},
      {path: 'confirm-dialog', component: ConfirmDialogComponent},
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
    SpinnerContainerComponent,
    SwaggerComponent,
    FormRecordComponent,
    MemoryListComponent,
    ConfirmDialogComponent,
    HomeComponent,
    ParametersViewComponent
  ],
  providers: [
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: ServerFailureHandler, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: ProgressInfoService, multi: true }
  ], 
  bootstrap: [ AppComponent ]
})
export class AppModule { }