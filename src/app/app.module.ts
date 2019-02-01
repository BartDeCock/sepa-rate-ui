import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {SeparationModule} from './separation/separation.module';
import {UserModule} from './user/user.module';
import {CookieModule} from 'ngx-cookie';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CookieModule.forRoot(),
    FormsModule,
    BrowserModule,
    HttpClientModule,
    UserModule,
    SeparationModule,
    //  App routing module should always be last in list. This module contains the fallback paths
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
