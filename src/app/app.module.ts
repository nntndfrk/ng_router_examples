import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
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
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    AboutComponent,
    AlertsComponent,
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    MessagesService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
