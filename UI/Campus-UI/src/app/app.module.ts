import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SingInComponent} from './sing-in/sing-in.component';
import {SignInService} from './shared/services/sign-in.service';
<<<<<<< Updated upstream
import { RegistrationComponent } from './registration/registration.component';
=======
import { RegistrationPageComponent } from './registration-page/registration-page.component';
>>>>>>> Stashed changes


@NgModule({
  declarations: [
    AppComponent,
    SingInComponent,
<<<<<<< Updated upstream
    RegistrationComponent
=======
    RegistrationPageComponent
>>>>>>> Stashed changes
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
