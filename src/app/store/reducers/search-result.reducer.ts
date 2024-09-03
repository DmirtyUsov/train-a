import { createReducer, on } from '@ngrx/store';
import {
  loadSearchResults,
  loadSearchResultsSuccess,
  loadSearchResultsFailure,
  setSearchItems,
  selectSearchItem,
} from '../actions/search-result.actions';
import { SearchResponse } from '../../models/search-response.model';
import { ResponseError } from '../../models/error.model';
import { SearchItem } from '../../models/search-item.model';
import { mapCarriages } from '../../helpers/search-result.helpers';

export interface SearchResultState {
  searchItems: SearchItem[];
  selectedItem: SearchItem | null;
  searchResponse: SearchResponse | null;
  loading: boolean;
  error: ResponseError | null;
}

export const initialSearchResultState: SearchResultState = {
  searchItems: [],
  selectedItem: null,
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
  on(
    setSearchItems,
    (state, { searchItems }): SearchResultState => ({
      ...state,
      searchItems,
    }),
  ),
  on(
    selectSearchItem,
    (state, { selectedItem }): SearchResultState => ({
      ...state,
      selectedItem,
    }),
  ),
);

export function parseSearchResponse(response: SearchResponse): SearchItem[] {
  const searchItems: SearchItem[] = [];

  response.routes.forEach((route) => {
    route.schedule.forEach((schedule) => {
      const fromStationIndex = route.path.indexOf(response.from.stationId);
      const segmentIndex = Math.min(
        fromStationIndex,
        schedule.segments.length - 1,
      );

      const searchItem: SearchItem = {
        route,
        schedule,
        rideId: schedule.rideId,
        fromStation: response.from,
        toStation: response.to,
        deparchureTime: new Date(schedule.segments[segmentIndex].time[0]),
        arrivalTime: new Date(
          schedule.segments[schedule.segments.length - 1].time[1],
        ),
        carriages: mapCarriages(route, schedule, segmentIndex),
      };

      searchItems.push(searchItem);
    });
  });

  return searchItems;
}
