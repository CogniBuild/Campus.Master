import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageLayoutComponent } from './views/user-page-layout/user-page-layout.component';
import { TaskListLayoutComponent } from './views/task-list-layout/task-list-layout/task-list-layout.component';
import { TaskBoardLayoutComponent } from './views/tasks_board/task-board-layout/task-board-layout.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'campus', component: UserPageLayoutComponent, children: [
      { path: '', component: TaskBoardLayoutComponent },
      { path: 'dashboard', component: TaskBoardLayoutComponent },
      { path: 'task_list', component: TaskListLayoutComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
