import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureName);

export const selectRegistrationSpinnerState = createSelector(
    selectAuthState,
    (state) => state.isRegistrationSpinnerOn
);

export const selectSignInSpinnerState = createSelector(
    selectAuthState,
    (state) => state.isSignInSpinnerOn
);
