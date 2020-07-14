import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  public namespace: String = null;
  public isHome = true;

  constructor(router: Router,
              private authService: AuthenticationService) {
    
    router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        let navEvt: NavigationEnd = e;
        let parts = navEvt.url.split('/');
        if (parts.length >= 2) {
          this.isHome = (parts[1] === '' || parts[1] === 'login');
        }

        this.namespace = (parts.length < 2) ? null : parts[2];
      }
    });
  }

  ngOnInit() {
  }

  public logout() {
    this.authService.logout();
  }

}