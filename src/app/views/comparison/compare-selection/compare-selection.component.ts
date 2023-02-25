import { Component, OnInit } from '@angular/core';
import { ApiRegistryService } from 'src/app/services/api-registry.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiNamespace } from 'src/app/models/models';

@Component({
  selector: 'app-compare-selection',
  templateUrl: './compare-selection.component.html',
  styleUrls: ['./compare-selection.component.css']
})
export class CompareSelectionComponent implements OnInit {

  namespaceList: string[] = []
  versionList: string[] = []
  api: string | null = null;

  targetNamespace = null;
  targetVersion = null;

  // view only
  versionEnabled = false;

  apiName?: string;
  originNs?: string;
  originVersion?: string;

  constructor(private service: ApiRegistryService,
              private route: ActivatedRoute,
              private navigator: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(res => {
      this.api = res.get('apiId');

      this.service.getApiRecord(this.api).subscribe(result => {
        this.apiName = result.name
        this.originNs = result.namespace
        this.originVersion = result.version
      });

      this.service.listNamespaces().subscribe(result => {
        this.namespaceList = result;
      });
    });    
  }

  private getApiVersions() {
    if (!this.api) {
      console.warn("Missing reference API")
    } else {
      // TODO get only versions available in selected ns
      this.service.getAvailableVersions(this.api)
        .subscribe(res => {
          this.versionList = res;
          this.versionEnabled = true;
        });
    }  
  }

  public onChangeNm() {
    console.log('Namespace: ' + this.targetNamespace);
    this.versionEnabled = false;
    this.getApiVersions();
  }

  public goToCompare() {
    this.navigator.navigate(['compare-result', this.apiName, this.originNs, this.originVersion],
      {
        queryParams: {
          'compareNs': this.targetNamespace,
          'compareVer': this.targetVersion,
        }
      })
  }

}
