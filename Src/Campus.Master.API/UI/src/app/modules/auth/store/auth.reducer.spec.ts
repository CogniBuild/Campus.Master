import * as authReducer from "./auth.reducer";
import { AuthState } from "./auth.reducer";
import { AuthActions } from './actions';

describe('authReducer', () => {
    describe('Sign up spinner', () => {
        it('turn on sign up spinner when sign up action dispatched', () => {
            const { initialState } = authReducer;
            const newState: AuthState =
            {
                isSignUpSpinnerOn: true,
                isSignInSpinnerOn: false,
                profile: null
            };

            const action = AuthActions.signUp({ signUpModel: null });
            const state = authReducer.authReducer(initialState, action);

            compareStates(state, newState);
        });

        it('turn off spinner when signUpSuccess or signUpFailed actions dispatched', () => {
            const { initialState } = authReducer;
            const newState: AuthState =
            {
                isSignUpSpinnerOn: false,
                isSignInSpinnerOn: false,
                profile: null
            };

            const actionSuccess = AuthActions.signUpSuccess({ token: 'token' });
            const actionFailed = AuthActions.signInFailed({ httpError: null });
            const stateSuccess = authReducer.authReducer(initialState, actionSuccess);
            const stateFailed = authReducer.authReducer(initialState, actionFailed);

            compareStates(stateSuccess, newState);
            compareStates(stateFailed, newState);
        });
        // TODO: how to reuse it for Sign-in
    })
})

function compareStates(state: AuthState, newState: AuthState) {
    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
}
