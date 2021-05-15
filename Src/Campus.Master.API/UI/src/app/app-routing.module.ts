import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageLayoutComponent } from './views/user-page-layout/user-page-layout.component';
import { CanActivateDashboardGuard } from '@core/guards/can-activate-dashboard.guard';


const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'campus', component: UserPageLayoutComponent, canActivate: [CanActivateDashboardGuard],
    children: [
      {
        path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'calendar', loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: 'classroom', loadChildren: () => import('./modules/classroom/classroom.module').then(m => m.ClassroomModule)
      },
      {
        path: '**', redirectTo: 'dashboard', pathMatch: 'full'
      }],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
