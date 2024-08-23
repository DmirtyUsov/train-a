import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchResultState } from '../reducers/search-result.reducer';

export const selectSearchResultState =
  createFeatureSelector<SearchResultState>('searchResult');

export const selectSearchResult = createSelector(
  selectSearchResultState,
  (state: SearchResultState) => state.searchResponse,
);

export const selectSearchLoading = createSelector(
  selectSearchResultState,
  (state: SearchResultState) => state.loading,
);

export const selectSearchError = createSelector(
  selectSearchResultState,
  (state: SearchResultState) => state.error,
);
