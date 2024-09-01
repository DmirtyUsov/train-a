import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchResultState } from '../reducers/search-result.reducer';

export const selectSearchResultState =
  createFeatureSelector<SearchResultState>('searchResult');

export const selectSearchItems = createSelector(
  selectSearchResultState,
  (state: SearchResultState) => state.searchItems,
);

export const selectSelectedItem = createSelector(
  selectSearchResultState,
  (state: SearchResultState) => state.selectedItem,
);

export const selectSearchLoading = createSelector(
  selectSearchResultState,
  (state: SearchResultState) => state.loading,
);

export const selectSearchError = createSelector(
  selectSearchResultState,
  (state: SearchResultState) => state.error,
);
