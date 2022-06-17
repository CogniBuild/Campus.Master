import { Action, createReducer, on } from '@ngrx/store';
import { ProfileInfo } from '../shared/models';
import { AuthActions } from './actions';

export const authFeatureName = 'auth';

export interface AuthState {
    profile: ProfileInfo;
    isSignInSpinnerOn: boolean;
    isSignUpSpinnerOn: boolean;
}

export const initialState: AuthState = {
    profile: null,
    isSignInSpinnerOn: false,
    isSignUpSpinnerOn: false,
};

const reducer = createReducer(
    initialState,
    on(AuthActions.loadProfileInfoSuccess, (state, { profile }) => ({ ...state, profile })),

    // Sign-up
    on(AuthActions.signUp, (state) => ({ ...state, isSignUpSpinnerOn: true })),
    on(AuthActions.signUpSuccess, (state) => ({ ...state, isSignUpSpinnerOn: false })),
    on(AuthActions.signUpFailed, (state) => ({ ...state, isSignUpSpinnerOn: false })),

    // Sign-in
    on(AuthActions.signIn, (state) => ({ ...state, isSignInSpinnerOn: true })),
    on(AuthActions.signInSuccess, (state) => ({ ...state, isSignInSpinnerOn: false })),
    on(AuthActions.signInFailed, (state) => ({ ...state, isSignInSpinnerOn: false }))
);

export function authReducer(state: AuthState, action: Action): AuthState {
    return reducer(state, action);
}
