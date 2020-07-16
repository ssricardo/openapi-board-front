import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {LoginData} from "../../models/models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: LoginData = {
    user: '',
    password: ''
  };

  isLoggedIn = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.getUser()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
        data => {
          this.authService.storeToken(data);

          this.errorMessage = null;
          this.isLoggedIn = true;
          this.router.navigate(['/']);
        },
        err => {
            this.errorMessage = err.error;
        }
    );
  }

}
