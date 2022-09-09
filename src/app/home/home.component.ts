import {Component, OnInit} from '@angular/core';
import {Config} from "../app.config";
import { AuthenticationService } from '../services/authentication.service';
import { LoggedUser } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private user: LoggedUser | null = null;
  public mainNamespace: string;

  constructor(private authService: AuthenticationService) {
    this.mainNamespace = Config.MAIN_NAMESPACE;
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  public get showSubscriptions(): boolean {
    return ((this.user?.roles?.indexOf('MANAGER') ?? -1) > -1);
  }
}
