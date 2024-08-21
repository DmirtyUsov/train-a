import { Injectable, signal, effect } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { SearchResponse } from '../models/search.model';
import {
  selectDateSelected,
  selectFromStationSelected,
  selectToStationSelected,
} from '../store/selectors/search.selectors';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = '/api/search';

  // Signal to hold the search response
  searchResult = signal<SearchResponse | null>(null);

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {
    // Set up an effect to automatically log the search result when it changes
    effect(() => {
      const result = this.searchResult();
      if (result) {
        console.log('Search Result:', result);
      }
    });
  }

  getSearchResult(): void {
    // Select the state values for fromStation, toStation, and date
    this.store
      .pipe(
        select(selectFromStationSelected),
        switchMap((fromStation) =>
          this.store.pipe(
            select(selectToStationSelected),
            switchMap((toStation) =>
              this.store.pipe(
                select(selectDateSelected),
                map((date) => ({ fromStation, toStation, date })),
              ),
            ),
          ),
        ),
        switchMap(({ fromStation, toStation, date }) => {
          let params = new HttpParams()
            .set('fromLatitude', fromStation?.latitude.toString() || '')
            .set('fromLongitude', fromStation?.longitude.toString() || '')
            .set('toLatitude', toStation?.latitude.toString() || '')
            .set('toLongitude', toStation?.longitude.toString() || '');

          if (date) {
            params = params.set('time', date.getTime().toString());
          }

          return this.http.get<SearchResponse>(this.apiUrl, { params });
        }),
      )
      .subscribe({
        next: (response: SearchResponse) => {
          this.searchResult.set(response); // Set the signal with the response
        },
        error: (error) => {
          console.error('Error fetching search result:', error);
        },
      });
  }
}
