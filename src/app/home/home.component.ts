import {Component} from '@angular/core';
import {Config} from "../app.config";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public mainNamespace: string;

  constructor() {
    this.mainNamespace = Config.MAIN_NAMESPACE;
  }
}
