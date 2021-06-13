import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomViewComponent } from '../../components/classroom-view/classroom-view.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ClassroomViewRoutingModule } from './classroom-view-routing.module';
import { ClassroomParticipantsComponent } from '../../components/classroom-participants/classroom-participants.component';
import { ClassroomModulesComponent } from '../../components/classroom-modules/classroom-modules.component';
import { ClassroomGradesComponent } from '../../components/classroom-grades/classroom-grades.component';

@NgModule({
  declarations: [
    ClassroomViewComponent,
    ClassroomParticipantsComponent,
    ClassroomModulesComponent,
    ClassroomGradesComponent],
  imports: [
    SharedModule,
    CommonModule,
    ClassroomViewRoutingModule
  ]
})
export class ClassroomViewModule {
}
