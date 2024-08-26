import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StationsState } from '../reducers/stations.reducer';

export const selectStationsState =
  createFeatureSelector<StationsState>('stations');

export const selectAllStations = createSelector(
  selectStationsState,
  (state: StationsState) => state.stations,
);

export const selectStationsLoading = createSelector(
  selectStationsState,
  (state: StationsState) => state.loading,
);

export const selectStationsError = createSelector(
  selectStationsState,
  (state: StationsState) => state.error,
);
