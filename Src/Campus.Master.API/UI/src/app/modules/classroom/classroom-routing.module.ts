import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomComponent } from './classroom.component';

const routes: Routes = [
  {
    path: '',
    component: ClassroomComponent
  },
  {
    path: 'classroom-view/:id',
    loadChildren: () => import('./shared/modules/classroom-view/classroom-view.module').then(m => m.ClassroomViewModule)
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassroomRoutingModule {

}
