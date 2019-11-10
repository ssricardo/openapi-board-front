import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule }    from '@angular/common/http';
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

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxTextDiffModule, 
    
    MatFormFieldModule, 
    MatSelectModule,

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
    CompareSelectionComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }