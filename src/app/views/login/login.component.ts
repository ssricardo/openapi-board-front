import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {LoginData} from "../../models/models";
import { NotificationService } from 'src/app/services/notification.service';

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
  errorMessage = undefined;
  roles: string[] = [];

  constructor(private authService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) { }

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
            if (err.status == 401 || err.status == 403) {
              this.errorMessage = 'Reason: ' + err.error + ' Please use valid credentials.';
            } else {
              this.notificationService.showError(`A non-identified error happened. If it persists, inform an adminstrator.
                For details, check the console.`);
            }
        }
    );
  }

}
