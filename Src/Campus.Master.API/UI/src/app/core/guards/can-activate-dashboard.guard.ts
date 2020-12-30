import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SignInService } from '../sign-in.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CanActivateDashboardGuard implements CanActivate {

  constructor(private signInService: SignInService, private router: Router, private toastr: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.signInService.getProfileInformation().pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        this.router.navigate(['']);
        this.toastr.error('Your are not authorized', '401', {
          toastClass: 'ngx-toastr server-error-toastr'
        });
        return of(false);
      })
    );
  }
}
