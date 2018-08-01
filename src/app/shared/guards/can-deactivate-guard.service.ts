import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {UserEditComponent} from '../../users/user-edit/user-edit.component';
import {MessagesService} from '../services/messages.service';
import {Observable, of} from 'rxjs';


@Injectable()
export class CanDeactivateGuard implements CanDeactivate<UserEditComponent> {

  constructor(private msgService: MessagesService) {
  }

  canDeactivate(component: UserEditComponent): Observable<boolean> {
    if (component.editInProgress) {
      this.msgService.setMessage({
        type: 'warning',
        body: 'Вы точно хочете покинуть страницу, не сохранив изменения?',
        action: true
      });
      return this.msgService.getSubmit();
    }
    return of(true);
  }

}
