import { Component, OnInit, Inject } from '@angular/core';
import { ComparisonService } from 'src/app/services/comparison.service';

@Component({
  selector: 'compare-result',
  templateUrl: './compare-result.component.html',
  styleUrls: ['./compare-result.component.css']
})
export class CompareResultComponent implements OnInit {

  leftApp = 'Some content here'
  rightApp = 'Other something'
  ready = false

  constructor(private service: ComparisonService) { }

  ngOnInit() {
    this.service.compareApps('Products', 'Production', '1.0',
      'Songs', 'Production', '1.0').subscribe(result => {
        console.log('Loading OK');
        console.log(result);
        this.leftApp = result.source.source ??  "ERROR"
        this.rightApp = result.compared.source ?? "ERROR"
        this.ready = true;
      }, err => console.error(err));  // TODO
  }

}
