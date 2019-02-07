import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {SeparationModule} from './separation/separation.module';
import {UserModule} from './user/user.module';
import {CookieModule} from 'ngx-cookie';
import {RatingModule} from './rating/rating.module';
import {AuthenticationInterceptorService} from './util/authentication-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CookieModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    UserModule,
    SeparationModule,
    RatingModule,
    //  App routing module should always be last in list. This module contains the fallback paths
    AppRoutingModule
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
