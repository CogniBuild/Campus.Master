import { createAction } from "@ngrx/store";

export const submitRegistrationForm = createAction('[Auth] Submit Registration Form');
export const registrationSuccess = createAction('[Auth/API] Registration Success');
export const registrationFailed = createAction('[Auth/API] Registration Failed');

export const signInUser = createAction('[Auth] Sign In User');
export const signInUserSuccess = createAction('[Auth/API] Sign In User Success');
export const signInUserFailed = createAction('[Auth/API] Sign In User Failed');