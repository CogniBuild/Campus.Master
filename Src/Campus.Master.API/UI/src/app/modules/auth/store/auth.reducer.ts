import { Action, createReducer, on } from '@ngrx/store';
import { AuthActions } from './actions';

export const authFeatureName = 'auth';

export interface RegistrationState {
    isSpinnerOn: boolean;
}

export const initialState: RegistrationState = {
    isSpinnerOn: false
};

const reducer = createReducer(
    initialState,
    on(AuthActions.submitRegistrationForm, () => ({ isSpinnerOn: true })),
    on(AuthActions.registrationSuccess, () => ({ isSpinnerOn: false })),
    on(AuthActions.registrationFailed, () => ({ isSpinnerOn: false }))
);

export function authReducer(state: RegistrationState, action: Action): RegistrationState {
    return reducer(state, action);
}
