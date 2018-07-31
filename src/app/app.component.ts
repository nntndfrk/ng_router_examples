import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';
import {MessagesService} from './shared/services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {
  }

  logOut() {
    this.router.navigate(['/login'])
      .then((isNavigate) => {
        if (isNavigate) {
          this.authService.logout();
        }
      })
      .catch((err) => {
        this.msgService.setMessage({
          type: 'danger',
          body: err
        });
      });

  }
}
