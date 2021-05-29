import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { ProfileSettingsComponent } from './profile-settings.component';
import { GeneralSettingsComponent } from './settings-groups/general-settings/general-settings.component';
import { EditProfileComponent } from './settings-groups/edit-profile/edit-profile.component';


@NgModule({
  declarations: [ProfileSettingsComponent, GeneralSettingsComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ProfileSettingsRoutingModule
  ]
})
export class ProfileSettingsModule { }
