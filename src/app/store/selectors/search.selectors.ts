import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../reducers/search.reducer';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectFromStationSelected = createSelector(
  selectSearchState,
  (state: SearchState) => state.fromStationSelected,
);

export const selectToStationSelected = createSelector(
  selectSearchState,
  (state: SearchState) => state.toStationSelected,
);

export const selectDateSelected = createSelector(
  selectSearchState,
  (state: SearchState) => state.dateSelected,
);
