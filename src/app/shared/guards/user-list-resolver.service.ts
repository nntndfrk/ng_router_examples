import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import {UserService} from '../services/user.service';

@Injectable()
export class UserListResolve implements Resolve<any> {

  constructor(private userService: UserService) {}

  resolve() {
    return this.userService.getUsers();
  }

}
