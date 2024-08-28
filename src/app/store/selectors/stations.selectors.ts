import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StationsState } from '../reducers/stations.reducer';
import { Station } from '../../models/station.models';
import { transformStations } from '../../helpers/search-result.helpers';

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

export const selectTransformedStations = createSelector(
  selectAllStations, // Assuming you already have this selector
  (stations: Station[]) => transformStations(stations),
);
