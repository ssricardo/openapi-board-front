import {Component, Input, OnInit} from '@angular/core';
import {HttpMethod, ParameterMemory, ParameterType} from "../../models/models";

@Component({
  selector: 'app-parameters-view',
  templateUrl: './parameters-view.component.html',
  styleUrls: ['./parameters-view.component.css']
})
export class ParametersViewComponent implements OnInit {

  @Input()
  public fixedType: string;

  @Input()
  public dataSource: Array<ParameterMemory>;

  @Input()
  public hiddenType: string;

  methodKeys: Map<string, string>;

  constructor() {
    this.methodKeys = new Map<string, string>();
    for (let item in ParameterType) {
      if (this.hiddenType == undefined || item != this.hiddenType) {
        this.methodKeys.set(item, ParameterType[item]);
      }
    }
  }

  ngOnInit() {
  }

  public addItems() {
    this.dataSource.push({
      name: '',
      value: '',
      kind: (this.fixedType != undefined) ? ParameterType[this.fixedType] : HttpMethod.GET
    });
  }

  public removeItem(pos: number) {
    this.dataSource.splice(pos, 1);
  }

}
