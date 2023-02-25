import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiCardComponent } from './views/api-record/api-card/api-card.component';
import { ApiListComponent } from './views/api-record/api-list/api-list.component';
import { NamespaceInfoComponent } from './views/namespaces/namespace-info/namespace-info.component';
import { NamespaceListComponent } from './views/namespaces/namespace-list/namespace-list.component';
import { TopBarComponent } from './views/top-bar/top-bar.component';
import { ConfirmDialogComponent } from "./confirm-dialog/ConfirmDialogComponent";
import { LoginComponent } from './views/login/login.component';
import { SampleListComponent } from './views/memory-list/sample-list.component';
import { SubscriberFormComponent } from './views/subscription/subscriber-form/subscriber-form.component';
import { SubscriberListComponent } from './views/subscription/subscriber-list/subscriber-list.component';
import { HomeComponent } from './home/home.component';

import { ProgressInfoService } from './loading/progress-info.service';
import { SpinnerContainerComponent } from './loading/spinner-container/spinner-container.component';
import { NotificationService } from './services/notification.service';
import { ServerFailureHandler } from './services/server-failure-handler';

import { AuthInterceptor } from "./auth/auth-interceptor";
import { RouteConfigModule } from "./route-config.module";
import { ComparisonModule } from './comparison.module';
import { SwaggerInternalModule } from './swagger.module';
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        RouterModule,

        // Material
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatCardModule,

        RouteConfigModule,
        BrowserAnimationsModule,

        SwaggerInternalModule,
        ComparisonModule,
        MatTabsModule,

    ],
  declarations: [
    AppComponent,
    TopBarComponent,
    NamespaceListComponent,
    NamespaceInfoComponent,
    ApiListComponent,
    ApiCardComponent,
    
    SpinnerContainerComponent,
    SampleListComponent,
    ConfirmDialogComponent,
    HomeComponent,
    LoginComponent,
    SubscriberListComponent,
    SubscriberFormComponent
  ],
  providers: [
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: ServerFailureHandler, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: ProgressInfoService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }