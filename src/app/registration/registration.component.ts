import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {MessagesService} from '../shared/services/messages.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  editInProgress = false;
  @ViewChild('form') form: NgForm;
  userRoles = ['admin', 'manager', 'HR'];
  role: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  ngOnInit() {
    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      this.router.navigate(['/users']);
    }

    this.form.valueChanges.subscribe(() => {
        if (this.form.touched || this.form.dirty) {
          this.editInProgress = true;
        }
      }
    );
  }

  submitForm() {
    this.editInProgress = false;
    this.authService.login(this.form.value.login, this.form.value.password)
      .subscribe(
        () => {
          this.msgService.setMessage({
            type: 'success',
            body: `${this.form.value.login}, Вы успешно вошли в систему. Добро пожаловать!`
          });
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 2000);
        },
        err => {
          this.msgService.setMessage({
            type: 'danger',
            body: err.error.error
          });
        }
      );
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

}
