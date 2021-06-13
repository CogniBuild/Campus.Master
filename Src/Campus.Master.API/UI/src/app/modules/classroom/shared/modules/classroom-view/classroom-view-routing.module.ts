import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomViewComponent } from '../../components/classroom-view/classroom-view.component';
import { ClassroomParticipantsComponent } from '../../components/classroom-participants/classroom-participants.component';
import { ClassroomModulesComponent } from '../../components/classroom-modules/classroom-modules.component';
import { ClassroomGradesComponent } from '../../components/classroom-grades/classroom-grades.component';

const routes: Routes = [
  {
    path: '',
    component: ClassroomViewComponent,
    children: [
      {
        path: 'participants',
        component: ClassroomParticipantsComponent
      },
      {
        path: 'modules',
        component: ClassroomModulesComponent
      },
      {
        path: 'grades',
        component: ClassroomGradesComponent
      },
      {
        path: '**',
        redirectTo: 'participants'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomViewRoutingModule {

}
