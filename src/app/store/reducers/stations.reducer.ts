import { createReducer, on } from '@ngrx/store';
import * as StationsActions from '../actions/stations.actions';
import { Station } from '../../models/station.models';

export interface StationsState {
  stations: Station[];
  loading: boolean;
  error: any;
}

export const initialState: StationsState = {
  stations: [],
  loading: false,
  error: null,
};

export const stationsReducer = createReducer(
  initialState,
  on(StationsActions.loadStations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StationsActions.loadStationsSuccess, (state, { stations }) => ({
    ...state,
    loading: false,
    stations,
  })),
  on(StationsActions.loadStationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
