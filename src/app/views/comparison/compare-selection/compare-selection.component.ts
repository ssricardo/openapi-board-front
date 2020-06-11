import { Component, OnInit } from '@angular/core';
import { AppRegistryService } from 'src/app/services/app-registry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppNamespace } from 'src/app/models/models';

@Component({
  selector: 'app-compare-selection',
  templateUrl: './compare-selection.component.html',
  styleUrls: ['./compare-selection.component.css']
})
export class CompareSelectionComponent implements OnInit {

  namespaceList: AppNamespace[] = []
  versionList: string[] = []
  app: string = null;
  sourceNs: string;
  sourceVersion: string;

  targetNamespace = null;
  targetVersion = null;

  // view only
  versionEnabled = false;

  constructor(private service: AppRegistryService, 
              private route: ActivatedRoute,
              private navigator: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(res => {
      this.app = res.get('app');
      this.sourceNs = res.get('namespace');
      this.sourceVersion = res.get('version');

      this.service.listNamespaces().subscribe(result => {
        this.namespaceList = result;
      });
    });    
  }

  public getAppVersions() {
    this.service.getAvailableVersions(this.targetNamespace, this.app)
      .subscribe(res => {
        this.versionList = res;
        this.versionEnabled = true;
      });
  }

  public onChangeNm() {
    console.log('Namespace: ' + this.targetNamespace);
    this.versionEnabled = false;
    this.getAppVersions();
  }

  public goToCompare() {
    this.navigator.navigate(['compare-result', this.app, this.sourceNs, 
      this.sourceVersion], 
      {
        queryParams: {
          'compareNs': this.targetNamespace,
          'compareVer': this.targetVersion,
        }
      })
  }

}
