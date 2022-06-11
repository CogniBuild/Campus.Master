import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { errorToastr } from './toastr.actions';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastrEffects {
    private readonly toastStyles = {
        toastClass: 'ngx-toastr server-error-toastr',
    };

    $showErrorToastr = createEffect(() =>
        this.actions$.pipe(
            ofType(errorToastr),
            tap(({ message, header }) =>
                this.toastrService.error(message, header, this.toastStyles)
            )
        ), { dispatch: false }
    );
    constructor(
        private actions$: Actions,
        private toastrService: ToastrService) { }
}
