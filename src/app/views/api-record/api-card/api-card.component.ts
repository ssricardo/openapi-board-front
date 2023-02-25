import { Component, OnInit, Input, Inject } from '@angular/core';
import { ApiRecord } from '../../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.css']
})
export class ApiCardComponent implements OnInit {

  @Input()
  public app!: ApiRecord;

  @Input()
  public namespace!: string;

  @Input()
  public listIndex!: number;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public openApp() {
    window.open(`/swagger/${this.app.apiId}`, '_blank');
  }

  public goToCompare() {
    this.router.navigate(['compareto', this.app.apiId])
  }

  public viewAsDoc() {
    window.open(`/redoc/${this.app.apiId}`, '_blank');
  }

}
