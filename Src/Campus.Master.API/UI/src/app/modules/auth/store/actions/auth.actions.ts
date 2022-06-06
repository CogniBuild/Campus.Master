import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ProfileInfo, SignInCredentials, SignUpCredentials } from '../../shared/models';


export const signUp = createAction('[Auth] Sign Up', props<{ signUpModel: SignUpCredentials }>());
export const signUpSuccess = createAction('[Auth/API] Sign Up Success', props<{ token: string }>());
export const signUpFailed = createAction('[Auth/API] Sign Up Failed', props<{ httpError: HttpErrorResponse }>());

export const signIn = createAction('[Auth] Sign In', props<{ signInModel: SignInCredentials }>());
export const signInSuccess = createAction('[Auth/API] Sign In User Success', props<{ token: string }>());
export const signInFailed = createAction('[Auth/API] Sign In User Failed', props<{ httpError: HttpErrorResponse }>());

export const loadProfileInfoSuccess = createAction('[Auth/API] Load profile info success', props<{ profile: ProfileInfo }>());
export const navigateToCampusRoute = createAction('[Auth] Navigate to campus route');

