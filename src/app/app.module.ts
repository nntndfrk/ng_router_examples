import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ClarityModule} from '@clr/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AuthService} from './shared/services/auth.service';
import {NotFoundComponent} from './not-found/not-found.component';
import {AboutComponent} from './about/about.component';
import {AuthGuard} from './shared/guards/auth-guard.service';
import {MessagesService} from './shared/services/messages.service';
import {AlertsComponent} from './alerts/alerts.component';
import {RegistrationComponent} from './registration/registration.component';
import {CanDeactivateGuard} from './shared/guards/can-deactivate-guard.service';
import {AuthInterceptor} from './shared/services/auth-interceptor.service';
import {PostsModule} from './posts/posts.module';
import {UtilsService} from './shared/services/utils.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    AboutComponent,
    AlertsComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    PostsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    MessagesService,
    AuthGuard,
    CanDeactivateGuard,
    UtilsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
