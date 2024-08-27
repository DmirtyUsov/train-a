import { createReducer, on } from '@ngrx/store';
import {
  loadSearchResults,
  loadSearchResultsSuccess,
  loadSearchResultsFailure,
} from '../actions/search-result.actions';
import { SearchResponse } from '../../models/search-response.model';
import { ResponseError } from '../../models/error.model';

export interface SearchResultState {
  searchResponse: SearchResponse | null;
  loading: boolean;
  error: ResponseError | null;
}

export const initialSearchResultState: SearchResultState = {
  searchResponse: null,
  loading: false,
  error: null,
};

export const searchResultReducer = createReducer(
  initialSearchResultState,
  on(
    loadSearchResults,
    (state): SearchResultState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    loadSearchResultsSuccess,
    (state, { searchResponse }): SearchResultState => ({
      ...state,
      loading: false,
      searchResponse,
    }),
  ),
  on(
    loadSearchResultsFailure,
    (state, { error }): SearchResultState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
