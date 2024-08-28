import { createReducer, on } from '@ngrx/store';
import { SearchResponseStation } from '../../models/station.models';
import {
  selectDate,
  selectFromStation,
  selectToStation,
} from '../actions/search.actions';

export interface SearchState {
  fromStationSelected: SearchResponseStation | null;
  toStationSelected: SearchResponseStation | null;
  dateSelected: string | null;
}

export const initialState: SearchState = {
  fromStationSelected: null,
  toStationSelected: null,
  dateSelected: null,
};

export const searchReducer = createReducer(
  initialState,
  on(
    selectFromStation,
    (state, { station }): SearchState => ({
      ...state,
      fromStationSelected: station,
    }),
  ),
  on(
    selectToStation,
    (state, { station }): SearchState => ({
      ...state,
      toStationSelected: station,
    }),
  ),
  on(
    selectDate,
    (state, { date }): SearchState => ({
      ...state,
      dateSelected: date,
    }),
  ),
);
