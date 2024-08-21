import { createReducer, on } from '@ngrx/store';
import { Station } from '../../models/station.models';
import {
  selectDate,
  selectFromStation,
  selectToStation,
} from '../actions/search.actions';

export interface SearchState {
  fromStationSelected: Station | null;
  toStationSelected: Station | null;
  dateSelected: Date | null;
}

export const initialState: SearchState = {
  fromStationSelected: null,
  toStationSelected: null,
  dateSelected: null,
};

export const searchReducer = createReducer(
  initialState,
  on(selectFromStation, (state, { station }) => ({
    ...state,
    fromStationSelected: station,
  })),
  on(selectToStation, (state, { station }) => ({
    ...state,
    toStationSelected: station,
  })),
  on(selectDate, (state, { date }) => ({
    ...state,
    dateSelected: date,
  })),
);
