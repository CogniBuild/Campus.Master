import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, zip } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { RegistrationService } from '../shared/services/registration.service';
import { AuthActions } from './actions';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LocaleService } from '../../../core/services/locale.service';
import { ToastrService } from 'ngx-toastr';
import { SignInService } from '../../../core/services';

@Injectable()
export class AuthEffects {
  private readonly toastStyles = {
    toastClass: 'ngx-toastr server-error-toastr',
  };

  private readonly localeMap = new Map<string, string>([
    ['User already exists', 'AUTH.ERROR-TOASTR.USER-EXISTS'],
    ['Failed to create new user', 'AUTH.ERROR-TOASTR.NEW-USER'],
    ['Wrong email or password', 'AUTH.ERROR-TOASTR.WRONG-EMAIL-PASSWORD'],
  ]);

  $submitRegistrationForm = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.submitRegistration),
      mergeMap((action) =>
        this.registrationService.registerUser(action.signUpModel).pipe(
          map((token: string) => {
            return AuthActions.registrationSuccess({ token });
          }),
          catchError((httpError: HttpErrorResponse) =>
            of(AuthActions.registrationFailed({ httpError }))
          )
        )
      )
    )
  );

  $authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registrationSuccess, AuthActions.signInSuccess),
        mergeMap((action) => {
          localStorage.setItem('token', action.token); // TODO: Where to store token in ang apps
          this.router.navigate(['/campus']); // TODO: Move to component ?(consider using separate effect)

          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  $authFailed = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registrationFailed, AuthActions.signInFailed),
        mergeMap((action) => {
          const toastrHeader = this.localeService.get(
            'AUTH.ERROR-TOASTR.HEADER'
          );

          const localizedMsg$ =
            action.httpError.status === 400
              ? zip(
                  this.localeService.get(
                    this.localeMap.get(action.httpError.error)
                  ),
                  toastrHeader
                )
              : zip(
                  this.localeService.get('AUTH.ERROR-TOASTR.SERVER-ERROR'),
                  toastrHeader
                );

          return localizedMsg$.pipe(
            tap(([message, header]) =>
              this.toastrService.error(message, header, this.toastStyles)
            )
          ); // TODO: check if localizedMsg returns cold observable
        })
      ),
    { dispatch: false }
  );

  $signInUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInUser),
      mergeMap((action) =>
        this.signInService.login(action.signInModel).pipe(
          map((token: string) => {
            return AuthActions.signInSuccess({ token });
          }),
          catchError((httpError: HttpErrorResponse) =>
            of(AuthActions.signInFailed({ httpError }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private localeService: LocaleService,
    private registrationService: RegistrationService,
    private signInService: SignInService,
    private toastrService: ToastrService
  ) { }
}
