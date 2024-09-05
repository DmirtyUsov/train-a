import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouteState } from '../reducers/route.reducer';

export const selectRouteState = createFeatureSelector<RouteState>('route');

export const selectAllRoutes = createSelector(
  selectRouteState,
  (state: RouteState) => state.routes,
);

export const selectRouteError = createSelector(
  selectRouteState,
  (state: RouteState) => state.error,
);

export const selectRouteLoading = createSelector(
  selectRouteState,
  (state: RouteState) => state.loading,
);
