import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { Observable, of, zip } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { LocaleService } from '@core/services/locale.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateDashboardGuard implements CanActivate {
  constructor(
    private signInService: SignInService,
    private router: Router,
    private toastrService: ToastrService,
    private localeService: LocaleService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.signInService.getProfileInformation().pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        const toastStyles = {
          toastClass: 'ngx-toastr server-error-toastr',
        };

        this.router.navigate(['']);

        zip(
          this.localeService.get('AUTH.ERROR-TOASTR.NOT-AUTHORIZED'),
          this.localeService.get('AUTH.ERROR-TOASTR.HEADER')
        )
          .pipe(
            tap(([message, header]) =>
              this.toastrService.error(message, header, toastStyles)
            )
          )
          .subscribe(); // TODO: Is it ok ?

        return of(false);
      })
    );
  }
}
