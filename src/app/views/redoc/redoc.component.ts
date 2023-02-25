import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRegistryService } from 'src/app/services/api-registry.service';

declare var Redoc: any;

@Component({
  selector: 'app-redoc',
  templateUrl: './redoc.component.html',
  styleUrls: ['./redoc.component.css']
})
export class RedocComponent implements AfterViewInit {

  private apiId: string;

  constructor(private route: ActivatedRoute,
    private apiService: ApiRegistryService,
    @Inject(DOCUMENT) private _document: Document,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.apiId = this.route.snapshot.paramMap.get("apiId") ?? "";
  }

  ngAfterViewInit() {
    const jsRedoc = this._document.createElement("script")
    jsRedoc.type = "text/javascript"
    jsRedoc.src = "redoc-bundle.js"
    
    const __this = this
    jsRedoc.onload = function () {
      __this.loadRedoc()
    }

    this.elementRef.nativeElement.appendChild(jsRedoc)
  }

  loadRedoc() {
    this.apiService.getCurrentSource(this.apiId)
      .subscribe(res => {
        Redoc.init(res, {
          scrollYOffset: 50
        }, document.getElementById('redoc-container'))
      })
    
  }

}
