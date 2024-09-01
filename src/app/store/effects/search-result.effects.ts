import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  loadSearchResults,
  loadSearchResultsFailure,
  setSearchItems,
} from '../actions/search-result.actions';
import { SearchService } from '../../services/search.service';
import { parseSearchResponse } from '../reducers/search-result.reducer';

@Injectable()
export class SearchResultEffects {
  loadSearchResults$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSearchResults),
      mergeMap(({ fromStation, toStation, date }) => {
        return this.searchService
          .getSearchResult(fromStation, toStation, date)
          .pipe(
            map((searchResponse) => {
              const searchItems = parseSearchResponse(searchResponse);
              return setSearchItems({ searchItems });
            }),
            catchError((error) => {
              return of(loadSearchResultsFailure({ error }));
            }),
          );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private searchService: SearchService,
  ) {}
}
