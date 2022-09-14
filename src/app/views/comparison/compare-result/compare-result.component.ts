import { Component, OnInit, Inject } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';
import { ComparisonService } from 'src/app/services/comparison.service';

@Component({
  selector: 'compare-result',
  templateUrl: './compare-result.component.html',
  styleUrls: ['./compare-result.component.css']
})
export class CompareResultComponent implements OnInit {

  originalModel: DiffEditorModel = {
    code: 'Loading left...',
    language: 'json'
  };

  modifiedModel: DiffEditorModel = {
    code: 'Loading right...',
    language: 'json'
  };
  
  readonly editorOptions = {theme: 'vs-dark'};
  ready: boolean = false

  constructor(private service: ComparisonService) { }

  ngOnInit() {
    this.service.compareApps('Products', 'Production', '1.0',
      'Songs', 'Production', '1.0').subscribe(result => {
        console.debug('Comparison loading OK');        
        this.originalModel.code = result.source.source ??  "ERROR"
        this.modifiedModel.code = result.compared.source ?? "ERROR"
        this.ready = true
      }, err => console.error(err));
  }

}
