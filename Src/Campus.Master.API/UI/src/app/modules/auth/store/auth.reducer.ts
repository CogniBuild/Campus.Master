import { Action, createReducer, on } from '@ngrx/store';
import { ProfileInfo } from '../shared/models';
import { AuthActions } from './actions';

export const authFeatureName = 'auth';

export interface AuthState {
    profile: ProfileInfo;
    isSignInSpinnerOn: boolean;
    isRegistrationSpinnerOn: boolean;
}

export const initialState: AuthState = {
    profile: null,
    isSignInSpinnerOn: false,
    isRegistrationSpinnerOn: false,
};

const reducer = createReducer(
    initialState,
    on(AuthActions.loadProfileInfoSuccess, (state, { profile }) => ({ ...state, profile })),

    // Registration
    on(AuthActions.submitRegistration, (state) => ({ ...state, isRegistrationSpinnerOn: true })),
    on(AuthActions.signUpSuccess, (state) => ({ ...state, isRegistrationSpinnerOn: false })),
    on(AuthActions.signUpFailed, (state) => ({ ...state, isRegistrationSpinnerOn: false })),

    // Sign-in
    on(AuthActions.signIn, (state) => ({ ...state, isSignInSpinnerOn: true })),
    on(AuthActions.signInSuccess, (state) => ({ ...state, isSignInSpinnerOn: false })),
    on(AuthActions.signInFailed, (state) => ({ ...state, isSignInSpinnerOn: false }))
);

export function authReducer(state: AuthState, action: Action): AuthState {
    return reducer(state, action);
}
