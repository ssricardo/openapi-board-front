import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';

@Component({
  selector: 'namespace-info',
  templateUrl: './namespace-info.component.html',
  styleUrls: ['./namespace-info.component.css']
})
export class NamespaceInfoComponent implements OnInit {

  @Input()
  @Output()
  public name: string;

  constructor() { }

  ngOnInit() {
  }

}
