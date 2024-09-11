import { createAction, props } from '@ngrx/store';
import { SearchResponseStation } from '../../models/station.models';
import { SearchResponse } from '../../models/search-response.model';
import { ResponseError } from '../../models/error.model';
import { SearchItem } from '../../models/search-item.model';

export const loadSearchResults = createAction(
  '[Search Results] Load Search Results',
  props<{
    fromStation: SearchResponseStation;
    toStation: SearchResponseStation;
    date: string | null;
  }>(),
);

export const loadSearchResultsSuccess = createAction(
  '[Search Results] Load Search Results Success',
  props<{ searchResponse: SearchResponse }>(),
);

export const loadSearchResultsFailure = createAction(
  '[Search Results] Load Search Results Failure',
  props<{ error: ResponseError }>(),
);

export const setSearchItems = createAction(
  '[Search Results] Set Search Items',
  props<{ searchItems: SearchItem[] }>(),
);

export const selectSearchItem = createAction(
  '[Search Results] Select Search Item',
  props<{ selectedItem: SearchItem }>(),
);
