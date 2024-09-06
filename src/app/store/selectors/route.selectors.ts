import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouteState } from '../reducers/route.reducer';
import { selectAllStations } from './stations.selectors';
import { Route } from '../../models/route.model';
import { Station } from '../../models/station.models';

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

export const selectRoutesWithCities = createSelector(
  selectAllRoutes,
  selectAllStations,
  (routes: Route[], stations: Station[]) =>
    routes.map((route) => ({
      route,
      cities: route.path.map((stationId: number) => {
        const station = stations.find((item: Station) => item.id === stationId);
        return station ? station.city : 'loading city...';
      }),
    })),
);

export const selectIsCreateFormVisible = createSelector(
  selectRouteState,
  (state: RouteState) => state.isCreateFormVisible,
);
