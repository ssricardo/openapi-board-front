import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppRegistryService } from 'src/app/services/app-registry.service';

declare var Redoc: any;

@Component({
  selector: 'app-redoc',
  templateUrl: './redoc.component.html',
  styleUrls: ['./redoc.component.css']
})
export class RedocComponent implements AfterViewInit {

  private namespace: string;
  private apiName: string;

  constructor(private route: ActivatedRoute,
    private apiService: AppRegistryService, 
    @Inject(DOCUMENT) private _document: Document,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.namespace = encodeURIComponent(this.route.snapshot.paramMap.get("namespace") ?? "")
    this.apiName = encodeURIComponent(this.route.snapshot.paramMap.get("app") ?? "")    
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
    this.apiService.getCurrentSource(this.namespace, this.apiName)
      .subscribe(res => {
        Redoc.init(res, {
          scrollYOffset: 50
        }, document.getElementById('redoc-container'))
      })
    
  }

}
