import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileSettingsComponent } from './profile-settings.component';
import { GeneralSettingsComponent } from './settings-groups/general-settings/general-settings.component';
import { EditProfileComponent } from './settings-groups/edit-profile/edit-profile.component';

const routes: Routes = [{
  path: '', component: ProfileSettingsComponent, children: [
    {
      path: 'general', component: GeneralSettingsComponent,
    },
    {
      path: 'edit-profile', component: EditProfileComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSettingsRoutingModule {
}
