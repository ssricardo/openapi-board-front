import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

  containerClass = "container"

  constructor (private route: Router) {}

  ngOnInit(): void {
    const __this = this
    this.route.events
    .subscribe(rt => {
      if (rt instanceof NavigationEnd) {
        __this.containerClass = (rt.url.includes("swagger") || rt.url.includes("redoc"))
          ? "container-full"
          : "container"
      }
    })
  }
}