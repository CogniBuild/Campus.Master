import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SingInComponent} from './sing-in/sing-in.component';
import {SignInService} from './shared/services/sign-in.service';


@NgModule({
  declarations: [
    AppComponent,
    SingInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [SignInService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
