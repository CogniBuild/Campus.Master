import { NgModule } from '@angular/core';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { SharedModule } from '@shared/shared.module';

import { ProfileSettingsComponent } from './profile-settings.component';
import { GeneralSettingsComponent } from './settings-groups/general-settings/general-settings.component';
import { EditProfileComponent } from './settings-groups/edit-profile/edit-profile.component';
import { UploadImageComponent } from './settings-groups/shared/components/modals/upload-image/upload-image.component';
import { SuccessComponent } from './settings-groups/shared/components/modals/success/success.component';
import { FailComponent } from './settings-groups/shared/components/modals/fail/fail.component';


@NgModule({
  declarations: [
    ProfileSettingsComponent,
    GeneralSettingsComponent,
    EditProfileComponent,
    UploadImageComponent,
    SuccessComponent,
    FailComponent
  ],
  imports: [
    SharedModule,
    ProfileSettingsRoutingModule
  ],
  entryComponents: [
    UploadImageComponent,
    SuccessComponent,
    FailComponent
  ]
})
export class ProfileSettingsModule {
}
