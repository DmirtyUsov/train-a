import { createAction, props } from '@ngrx/store';
import { Station } from '../../models/station.models';
import { SearchResponse } from '../../models/search.model';

export const loadSearchResults = createAction(
  '[Search Results] Load Search Results',
  props<{ fromStation: Station; toStation: Station; date: Date | null }>(),
);

export const loadSearchResultsSuccess = createAction(
  '[Search Results] Load Search Results Success',
  props<{ searchResponse: SearchResponse }>(),
);

export const loadSearchResultsFailure = createAction(
  '[Search Results] Load Search Results Failure',
  props<{ error: any }>(),
);
