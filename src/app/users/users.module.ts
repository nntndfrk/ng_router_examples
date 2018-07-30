import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClarityModule} from '@clr/angular';
import {FormsModule} from '@angular/forms';

import {UserService} from '../shared/services/user.service';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UserSingleComponent} from './user-single/user-single.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {AuthGuard} from '../shared/guards/auth-guard.service';
import {CanDeactivateGuard} from '../shared/guards/can-deactivate-guard.service';
import {UserListResolve} from '../shared/guards/user-list-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    UsersRoutingModule
  ],
  declarations: [
    UsersComponent,
    UsersListComponent,
    UserSingleComponent,
    UserEditComponent,
    UserCreateComponent
  ],
  providers: [
    UserService,
    UserListResolve,
    AuthGuard,
    CanDeactivateGuard
  ]
})
export class UsersModule {
}
