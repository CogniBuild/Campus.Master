import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingInComponent } from './sing-in/sing-in.component';
import { SignUpComponent } from './sign-up/sign-up.component'

const routes: Routes = [
  { path: '', component: SingInComponent },
  { path: 'registration', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
