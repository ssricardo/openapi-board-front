import { Component, OnInit } from '@angular/core';
import { ApiRegistryService } from 'src/app/services/api-registry.service';

@Component({
  selector: 'namespace-list',
  templateUrl: './namespace-list.component.html',
  styleUrls: ['./namespace-list.component.css']
})
export class NamespaceListComponent implements OnInit {

  public nmFilterVal = "";
  private resultList = [];
  public filteredList = [];

  constructor(private service: ApiRegistryService) { }

  ngOnInit() {
    this.service.listNamespaces().subscribe(res => {
      this.resultList = res;
      this.onFilter(this.nmFilterVal);
    }); 
  }

  public onFilter(value) {
    this.filteredList = this.resultList.filter(
      item => item.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }

}
