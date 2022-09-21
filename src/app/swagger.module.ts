import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormRecordComponent } from './views/form-record/form-record.component';
import { ParametersViewComponent } from './views/parameters-view/parameters-view.component';
import { SwaggerComponent } from './views/swagger/swagger.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MonacoEditorModule.forRoot()
  ],
  declarations: [
    SwaggerComponent,
    FormRecordComponent,
    ParametersViewComponent
  ],
  providers: [    
  ],
  exports: [SwaggerComponent]
})
export class SwaggerInternalModule { }