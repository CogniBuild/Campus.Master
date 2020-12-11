import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SingInComponent, RegistrationPageComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
