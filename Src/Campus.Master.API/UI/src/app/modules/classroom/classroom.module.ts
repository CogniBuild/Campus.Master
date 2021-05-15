import { NgModule } from '@angular/core';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HeaderMenuInfoModule } from '../../shared/components/header-menu-info/header-menu-info.module';

import { ClassroomComponent } from './classroom.component';
import { ClassroomItemComponent } from './shared/components/classroom-item/classroom-item.component';
import { ChooseCreateComponent } from './shared/components/modals/classroom-modals/choose-create/choose-create.component';
import { CreateClassroomComponent } from './shared/components/modals/classroom-modals/create-classroom/create-classroom.component';
import { ConnectClassroomComponent } from './shared/components/modals/classroom-modals/connect-classroom/connect-classroom.component';
import { SearchPipeModule } from '../../shared/pipes/search-pipe/search-pipe.module';
import { DeleteClassroomComponent } from './shared/components/modals/classroom-modals/delete-classroom/delete-classroom.component';

@NgModule({
  declarations: [
    ClassroomComponent,
    ClassroomItemComponent,
    ChooseCreateComponent,
    CreateClassroomComponent,
    ConnectClassroomComponent,
    DeleteClassroomComponent
  ],
  imports: [
    SharedModule,
    ClassroomRoutingModule,
    HeaderMenuInfoModule,
    SearchPipeModule
  ],
  entryComponents: [
    ChooseCreateComponent,
    CreateClassroomComponent,
    ConnectClassroomComponent,
    DeleteClassroomComponent
  ]
})
export class ClassroomModule {
}
