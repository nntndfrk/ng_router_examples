import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClarityModule} from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './shared/services/auth.service';
import {FormsModule} from '@angular/forms';
import {NotFoundComponent} from './not-found/not-found.component';
import {AboutComponent} from './about/about.component';
import {UsersRoutingModule} from './users/users-routing.module';
import {UsersComponent} from './users/users.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {UserService} from './shared/services/user.service';
import {UserListResolve} from './shared/guards/user-list-resolver.service';
import {UserSingleComponent} from './users/user-single/user-single.component';
import {UserEditComponent} from './users/user-edit/user-edit.component';
import {UserCreateComponent} from './users/user-create/user-create.component';
import {AuthGuard} from './shared/guards/auth-guard.service';
import {CanDeactivateGuard} from './shared/guards/can-deactivate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    AboutComponent,
    UsersComponent,
    UsersListComponent,
    UserSingleComponent,
    UserEditComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    UsersRoutingModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CanDeactivateGuard,
    UserService,
    UserListResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
