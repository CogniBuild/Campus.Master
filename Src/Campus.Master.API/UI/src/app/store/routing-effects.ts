import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from '../modules/auth/store/actions';

@Injectable()
export class RoutingEffects {
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

    constructor(private actions$: Actions, private router: Router) { }
}
