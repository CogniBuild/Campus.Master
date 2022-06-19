import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { errorToastr } from './toastr.actions';
import { ToastrService } from 'ngx-toastr';
import { toastStyles } from '../../shared/toastr/toastr-styles';

@Injectable()
export class ToastrEffects {
    $showErrorToastr = createEffect(() =>
        this.actions$.pipe(
            ofType(errorToastr),
            tap(({ message, header }) =>
                this.toastrService.error(message, header, toastStyles)
            )
        ), { dispatch: false }
    );
    constructor(
        private actions$: Actions,
        private toastrService: ToastrService) { }
}
