import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageLayoutComponent } from './views/user-page-layout/user-page-layout.component';
import { TaskListLayoutComponent } from './views/task-list-layout/task-list-layout/task-list-layout.component';
import { CanActivateDashboardGuard } from './core/guards/can-activate-dashboard.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'campus', component: UserPageLayoutComponent, canActivate: [CanActivateDashboardGuard], children: [
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
