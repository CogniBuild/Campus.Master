import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, zip } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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

  $navigateToCampusRoute = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.navigateToCampusRoute),
        tap(() => {
          this.router.navigate(['/campus']);
        })
      ),
    { dispatch: false }
  );

  $authSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registrationSuccess, AuthActions.signInSuccess),
      mergeMap((action) => {
        localStorage.setItem('token', action.token); // TODO: consider save it in store
        return of(AuthActions.navigateToCampusRoute());
      })
    )
  );

  $authFailed = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registrationFailed, AuthActions.signInFailed),
        switchMap((action) => {
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

          return localizedMsg$.pipe(// return action here
            tap(([message, header]) =>
              this.toastrService.error(message, header, this.toastStyles)
            )
          );
        })
      ),
    { dispatch: false }
  );

  $signInUser = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInUser),
      switchMap((action) =>
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
