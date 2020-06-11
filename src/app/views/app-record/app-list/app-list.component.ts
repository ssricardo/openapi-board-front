import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppRegistryService } from '../../../services/app-registry.service';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {

  public namespace = null;
  public appList = [];

  constructor(private service: AppRegistryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.namespace = this.route.snapshot.paramMap.get('namespace');

    this.service.listAppOnNamespace(this.namespace).subscribe(res => {
      this.appList = res;
    });
  }

}
