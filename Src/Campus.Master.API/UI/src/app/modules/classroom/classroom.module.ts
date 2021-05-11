import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomComponent } from './classroom.component';
import { ClassroomRoutingModule } from './classroom-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClassroomItemComponent } from './shared/components/classroom-item/classroom-item.component';
import { ChooseCreateComponent } from './shared/components/modals/classroom-modals/choose-create/choose-create.component';
import { CreateClassroomComponent } from './shared/components/modals/classroom-modals/create-classroom/create-classroom.component';
import { ConnectClassroomComponent } from './shared/components/modals/classroom-modals/connect-classroom/connect-classroom.component';

@NgModule({
  declarations: [ClassroomComponent,
    ClassroomItemComponent,
    ChooseCreateComponent,
    CreateClassroomComponent,
    ConnectClassroomComponent],
  imports: [
    SharedModule,
    CommonModule,
    ClassroomRoutingModule
  ],
  entryComponents: [
    ChooseCreateComponent,
    CreateClassroomComponent,
    ConnectClassroomComponent
  ]
})
export class ClassroomModule {
}
