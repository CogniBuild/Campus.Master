import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageLayoutComponent } from './views/user-page-layout/user-page-layout.component';
import { CanActivateDashboardGuard } from './core/guards/can-activate-dashboard.guard';


const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'campus', component: UserPageLayoutComponent, canActivate: [CanActivateDashboardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
