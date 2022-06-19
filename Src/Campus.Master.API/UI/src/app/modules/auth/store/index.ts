import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureName, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureName);

export const selectSignUpSpinnerState = createSelector(
    selectAuthState,
    (state) => state.isSignUpSpinnerOn
);

export const selectSignInSpinnerState = createSelector(
    selectAuthState,
    (state) => state.isSignInSpinnerOn
);
