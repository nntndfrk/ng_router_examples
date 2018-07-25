import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {username: '', password: ''};
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/users']);
    }

  }

  login() {
    console.dir(this.credentials);
    this.errorMessage = '';

    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe(
        data => {
          this.router.navigate(['/users']);
          console.log(data);
        },
        err => {
          this.errorMessage = err.error.error;
          console.error(err.error.error);
        }
      );
  }

}
