import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "./actions";

export interface RegistrationState {
    isSpinnerOn: boolean;
}

export const initialState: RegistrationState = {
    isSpinnerOn: false
};

const _authReducer = createReducer(
    initialState,
    on(AuthActions.submitRegistrationForm,
        () => ({ isSpinnerOn: true })),
    on(AuthActions.registrationSuccess, () => ({ isSpinnerOn: false })),
    on(AuthActions.registrationFailed, () => ({ isSpinnerOn: false }))
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}
