import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth-state.model';

const selectFeature = createFeatureSelector<AuthState>('auth');

export const selectIsLoading = createSelector(
  selectFeature,
  (state) => state.isLoading,
);

export const selectIsAuthenticated = createSelector(
  selectFeature,
  (state) => state.isAuthenticated,
);
export const selectIsManager = createSelector(
  selectFeature,
  (state) => state.isManager,
);

export const selectProfile = createSelector(
  selectFeature,
  (state) => state.profile,
);

export const selectToken = createSelector(
  selectFeature,
  (state) => state.token,
);

export const selectError = createSelector(
  selectFeature,
  (state) => state.error,
);

export const selectPageModelView = createSelector(
  selectIsLoading,
  selectError,
  (isLoading, error) => ({ isLoading, error }),
);
