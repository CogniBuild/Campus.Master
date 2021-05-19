import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageLayoutComponent } from './views/user-page-layout/user-page-layout.component';
import { CanActivateDashboardGuard } from '@core/guards/can-activate-dashboard.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'campus', component: UserPageLayoutComponent, canActivate: [CanActivateDashboardGuard]
    , children: [
      {
        path: 'calendar', loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule),
      },
      {
        path: 'profile-settings',
        loadChildren: () => import('./modules/profile-settings/profile-settings.module').then(m => m.ProfileSettingsModule)
      }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
