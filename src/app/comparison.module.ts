import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';

import { CompareResultComponent } from './views/comparison/compare-result/compare-result.component';
import { CompareSelectionComponent } from './views/comparison/compare-selection/compare-selection.component';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MonacoEditorModule.forRoot(),

    MatSelectModule,
  ],
  declarations: [
    CompareResultComponent,
    CompareSelectionComponent,
  ],
  providers: [    
  ],
  exports: [CompareResultComponent, CompareSelectionComponent]
})
export class ComparisonModule { }