import { Component, OnInit, Input } from '@angular/core';
import { AppRecord } from '../../models/models';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css']
})
export class AppCardComponent implements OnInit {

  @Input()
  public app: AppRecord;

  constructor() { }

  ngOnInit() {
  }

  public openApp() {
    window.open('/view/' + this.app.name, '_blank');
  }

}
