import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingInComponent } from './sing-in/sing-in.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: SingInComponent },
  { path: 'registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
