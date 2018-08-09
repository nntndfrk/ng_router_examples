import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UsersComponent} from './users.component';
import {UsersListComponent} from './users-list/users-list.component';
import {UserListResolve} from '../shared/guards/user-list-resolver.service';
import {UserSingleComponent} from './user-single/user-single.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {AuthGuard} from '../shared/guards/auth-guard.service';
import {CanDeactivateGuard} from '../shared/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    /* Можно не указывать canActivateChild, т.к. стоит Guard canLoad в app-routing.module */
    /* и модуль UsersModule не будет загружен без авторизации */
    canActivateChild: [AuthGuard],
    resolve: {users: UserListResolve},
    children: [
      {
        path: '',
        component: UsersListComponent
      },
      {
        path: 'create',
        component: UserCreateComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id',
        component: UserSingleComponent
      },
      {
        path: ':id/edit',
        component: UserEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UsersRoutingModule {
}
