import {Component, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
