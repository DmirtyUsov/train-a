import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  loadSearchResults,
  loadSearchResultsSuccess,
  loadSearchResultsFailure,
} from '../actions/search-result.actions';
import { SearchService } from '../../services/search.service';

@Injectable()
export class SearchResultEffects {
  loadSearchResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSearchResults),
      mergeMap(({ fromStation, toStation, date }) => {
        console.log('Effect triggered with:', { fromStation, toStation, date });
        return this.searchService
          .getSearchResult(fromStation, toStation, date)
          .pipe(
            map((searchResponse) => {
              console.log('Search result received:', searchResponse);
              return loadSearchResultsSuccess({ searchResponse });
            }),
            catchError((error) => {
              console.error('Error in effect:', error);
              return of(loadSearchResultsFailure({ error }));
            }),
          );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private searchService: SearchService,
  ) {}
}
