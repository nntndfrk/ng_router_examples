import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate() {

    const isLogin = this.authService.isLoggedIn();
    if (isLogin) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild() {
    return this.canActivate();
  }

}