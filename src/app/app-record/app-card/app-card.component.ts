import { Component, OnInit, Input } from '@angular/core';
import { AppRecord } from '../../models/models';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css']
})
export class AppCardComponent implements OnInit {

  @Input()
  public app: string;

  @Input()
  public namespace: string;

  constructor() { }

  ngOnInit() {
  }

  public openApp() {
    window.open(`/view/?nm=${encodeURIComponent(this.namespace)}&app=${this.app}`, '_blank');
  }

}
