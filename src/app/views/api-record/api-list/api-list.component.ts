import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRecord } from 'src/app/models/models';
import { ApiRegistryService } from '../../../services/api-registry.service';

@Component({
  selector: 'api-list',
  templateUrl: './api-list.component.html',
  styleUrls: ['./api-list.component.css']
})
export class ApiListComponent implements OnInit {

  public namespace: string | null = null;
  public appList: ApiRecord[] = [];

  constructor(private service: ApiRegistryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.namespace = this.route.snapshot.paramMap.get('namespace');
    const ns = this.namespace ?? "None"

    this.service.listApiOnNamespace(ns).subscribe(res => {
      this.appList = res;
    });
  }

}
