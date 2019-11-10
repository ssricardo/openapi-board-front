import { Component, OnInit, Input, Inject } from '@angular/core';
import { AppRecord } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './app-card.component.html',
  styleUrls: ['./app-card.component.css']
})
export class AppCardComponent implements OnInit {

  @Input()
  public app: AppRecord;

  @Input()
  public namespace: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public openApp() {
    window.open(`/view/?nm=${encodeURIComponent(this.namespace)}&app=${this.app.name}`, '_blank');
  }

  public goToCompare() {
    this.router.navigate(['compareto', this.namespace, this.app.name, this.app.version])
  }

}
