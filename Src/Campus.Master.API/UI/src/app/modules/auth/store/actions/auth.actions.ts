import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthenticatedUser, RegisterUser } from '../../shared/models';


export const submitRegistration = createAction('[Auth] Submit Registration Form', props<{ unregisteredUser: RegisterUser }>());
export const registrationSuccess = createAction('[Auth/API] Registration Success', props<{ token: string }>());
export const registrationFailed = createAction('[Auth/API] Registration Failed', props<{ httpError: HttpErrorResponse }>());

export const signInUser = createAction('[Auth] Sign In User', props<{ user: AuthenticatedUser }>());
export const signInSuccess = createAction('[Auth/API] Sign In User Success', props<{ token: string }>());
export const signInFailed = createAction('[Auth/API] Sign In User Failed', props<{ httpError: HttpErrorResponse }>());
