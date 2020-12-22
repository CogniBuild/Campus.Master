import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SignInService } from '../sign-in.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateDashboardGuard implements CanActivate {

  constructor(private signInService: SignInService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.signInService.isAuthenticated();
  }
}
