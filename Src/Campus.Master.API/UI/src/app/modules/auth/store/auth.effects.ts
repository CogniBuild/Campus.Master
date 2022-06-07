import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, zip } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { SignUpService } from '../shared/services/registration.service';
import { AuthActions } from './actions';
import { HttpErrorResponse } from '@angular/common/http';
import { LocaleService } from '../../../core/services/locale.service';
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
      ofType(AuthActions.signUp),
      mergeMap((action) =>
        this.signUpService.signUp(action.signUpModel).pipe(
          map((token: string) =>
            AuthActions.signUpSuccess({ token })),
          catchError((httpError: HttpErrorResponse) =>
            of(AuthActions.signUpFailed({ httpError }))
          )
        )
      )
    )
  );

  $authSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess, AuthActions.signInSuccess),
      mergeMap((action) => {
        localStorage.setItem('token', action.token);
        return of(AuthActions.navigateToCampusRoute());
      })
    )
  );

  $authFailed = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signUpFailed, AuthActions.signInFailed),
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
      ofType(AuthActions.signIn),
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
    private localeService: LocaleService,
    private signUpService: SignUpService,
    private signInService: SignInService,
  ) { }
}
