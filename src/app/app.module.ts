import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NamespaceListComponent } from './namespaces/namespace-list/namespace-list.component';
import { NamespaceInfoComponent } from './namespaces/namespace-info/namespace-info.component';
import { AppListComponent } from './app-record/app-list/app-list.component';
import { AppCardComponent } from './app-record/app-card/app-card.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: '', component: NamespaceListComponent },
      { path: 'app-list/:namespace', component: AppListComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    NamespaceListComponent,
    NamespaceInfoComponent,
    AppListComponent,
    AppCardComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }