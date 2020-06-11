import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  public namespace: String = null;
  public isHome = true;

  constructor(router: Router) {
    
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        let navEvt: NavigationEnd = e;
        let parts = navEvt.url.split('/');
        if (parts.length >= 2) {
          this.isHome = parts[1] === '';
        }

        this.namespace = (parts.length < 2) ? null : parts[2];
      }
    });
  }

  ngOnInit() {
  }

}