import { createSelector } from "@ngrx/store";
import { RegistrationState } from "./auth.reducer";

export const selectRegistrationState = (state: RegistrationState) => state;

export const selectSpinnerState = createSelector(
    selectRegistrationState,
    (selectedAuthState) => selectedAuthState.isSpinnerOn
);
