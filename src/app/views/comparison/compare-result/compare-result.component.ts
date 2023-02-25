import { Component, OnInit, Inject } from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';
import { ComparisonService } from 'src/app/services/comparison.service';
import {ActivatedRoute} from "@angular/router";

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

  constructor(private service: ComparisonService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const source = {
      ns: this.route.snapshot.paramMap.get("namespace") ?? "",
      apiName: this.route.snapshot.paramMap.get("apiName") ?? "",
      version: this.route.snapshot.paramMap.get("version") ?? ""
    }

    const compare = {
      ns: this.route.snapshot.queryParamMap.get("compareNs") ?? "",
      version: this.route.snapshot.queryParamMap.get("compareVer") ?? ""
    }

    this.service.compareApps(source.apiName, source.ns, source.version,
      compare.ns, compare.version).subscribe(result => {
        console.debug('Comparison loading OK');        
        this.originalModel.code = result.source.source ??  "ERROR"
        this.modifiedModel.code = result.compared.source ?? "ERROR"
        this.ready = true
      }, err => console.error(err));
  }

}
