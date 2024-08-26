import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../models/auth-state.model';
import * as AuthActions from '../actions/auth.actions';

const initialState: AuthState = {
  isAuthenticated: false,
  isManager: false,
  isLoading: false,
  token: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.signIn,
    AuthActions.signOut,
    (state): AuthState => ({ ...state, isLoading: true }),
  ),
  on(
    AuthActions.signInSuccess,
    (state, action): AuthState => ({
      ...state,
      isLoading: false,
      token: action.token,
      isAuthenticated: true,
      error: null,
    }),
  ),
  on(
    AuthActions.signInFailure,
    (action): AuthState => ({
      ...initialState,
      error: action.error,
    }),
  ),
  on(AuthActions.signOutSuccess, (): AuthState => ({ ...initialState })),
  on(
    AuthActions.signOutFailure,
    (state, action): AuthState => ({ ...state, error: action.error }),
  ),
);
