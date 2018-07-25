import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import {UserEditComponent} from '../../users/user-edit/user-edit.component';


@Injectable()
export class CanDeactivateGuard implements CanDeactivate<UserEditComponent> {

  canDeactivate(component: UserEditComponent) {
    return !component.editInProgress;
  }

}
