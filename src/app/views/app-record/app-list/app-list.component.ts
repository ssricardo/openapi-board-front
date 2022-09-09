import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRecord } from 'src/app/models/models';
import { AppRegistryService } from '../../../services/app-registry.service';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  public namespace: string | null = null;
  public appList: ApiRecord[] = [];

  constructor(private service: AppRegistryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.namespace = this.route.snapshot.paramMap.get('namespace');
    const ns = this.namespace ?? "None"

    this.service.listAppOnNamespace(ns).subscribe(res => {
      this.appList = res;
    });
  }

}
