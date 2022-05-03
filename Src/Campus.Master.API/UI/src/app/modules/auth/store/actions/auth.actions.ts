import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ProfileInfo, SignInCredentials, SignUpCredentials } from '../../shared/models';


export const submitRegistration = createAction('[Auth] Registration', props<{ signUpModel: SignUpCredentials }>());
export const registrationSuccess = createAction('[Auth/API] Registration Success', props<{ token: string }>());
export const registrationFailed = createAction('[Auth/API] Registration Failed', props<{ httpError: HttpErrorResponse }>());

export const signInUser = createAction('[Auth] Sign In User', props<{ signInModel: SignInCredentials }>());
export const signInSuccess = createAction('[Auth/API] Sign In User Success', props<{ token: string }>());
export const signInFailed = createAction('[Auth/API] Sign In User Failed', props<{ httpError: HttpErrorResponse }>());

export const loadProfileInfoSuccess = createAction('[Auth/API] Load profile info success',props<{ profile: ProfileInfo }>());
export const navigateToCampusRoute = createAction('[Auth] Navigate to campus route');

