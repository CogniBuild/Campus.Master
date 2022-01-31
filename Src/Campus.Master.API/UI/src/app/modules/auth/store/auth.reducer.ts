import { Action, createReducer, on } from '@ngrx/store';
import { AuthActions } from './actions';

export const authFeatureName = 'auth';

export interface AuthState {
    isSignInSpinnerOn: boolean;
    isRegistrationSpinnerOn: boolean;
}

export const initialState: AuthState = {
    isSignInSpinnerOn: false,
    isRegistrationSpinnerOn: false
};

const reducer = createReducer(
    initialState,
    // Registration
    on(AuthActions.submitRegistration, (state) => ({ ...state, isRegistrationSpinnerOn: true })),
    on(AuthActions.registrationSuccess, (state) => ({ ...state, isRegistrationSpinnerOn: false })),
    on(AuthActions.registrationFailed, (state) => ({ ...state, isRegistrationSpinnerOn: false })),

    // Sign-in
    on(AuthActions.signInUser, (state) => ({ ...state, isSignInSpinnerOn: true })),
    on(AuthActions.signInSuccess, (state) => ({ ...state, isSignInSpinnerOn: false })),
    on(AuthActions.signInFailed, (state) => ({ ...state, isSignInSpinnerOn: false }))
);

export function authReducer(state: AuthState, action: Action): AuthState {
    return reducer(state, action);
}
