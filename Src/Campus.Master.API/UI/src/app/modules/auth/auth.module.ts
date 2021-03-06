import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { RegistrationService } from './shared/services/registration.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [SingInComponent, RegistrationComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers: [RegistrationService]
})
export class AuthModule {
}
