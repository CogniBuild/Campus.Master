import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';


export const errorToastr 
= createAction('Error toastr', props<{ message: string, header: string }>());