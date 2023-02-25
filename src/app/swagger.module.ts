import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { SampleFormComponent } from './views/form-record/sample-form.component';
import { ParametersViewComponent } from './views/parameters-view/parameters-view.component';
import { SwaggerComponent } from './views/swagger/swagger.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { RedocComponent } from './views/redoc/redoc.component';
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        MonacoEditorModule.forRoot(),
        MatTabsModule
    ],
  declarations: [
    SwaggerComponent,
    SampleFormComponent,
    ParametersViewComponent,
    RedocComponent
  ],
  providers: [    
  ],
  exports: [SwaggerComponent, RedocComponent]
})
export class SwaggerInternalModule { }