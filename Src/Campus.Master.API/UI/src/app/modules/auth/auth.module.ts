import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SharedModule } from '@shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { authFeatureName, authReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { SignUpService } from './shared/services/sign-up.service';
import { ToastrEffects } from '../../store/toastr/toastr-effects';

@NgModule({
  declarations: [SingInComponent, RegistrationComponent],
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature(authFeatureName, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [SignUpService]
})
export class AuthModule {
}
