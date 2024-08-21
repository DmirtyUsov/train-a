import { createReducer, on } from '@ngrx/store';
import * as StationsActions from '../actions/stations.actions';
import { Station } from '../../models/station.models';
import { ResponseError } from '../../models/error.model';

export interface StationsState {
  stations: Station[];
  loading: boolean;
  error: ResponseError | null;
}

export const initialState: StationsState = {
  stations: [],
  loading: false,
  error: null,
};

export const stationsReducer = createReducer(
  initialState,
  on(
    StationsActions.loadStations,
    (state): StationsState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    StationsActions.loadStationsSuccess,
    (state, { stations }): StationsState => ({
      ...state,
      loading: false,
      stations,
    }),
  ),
  on(
    StationsActions.loadStationsFailure,
    (state, { error }): StationsState => ({
      ...state,
      loading: false,
      ...error,
    }),
  ),
);
