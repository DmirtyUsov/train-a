import { Injectable, signal, effect } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse } from '../models/search.model';
import { Station } from '../models/station.models';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = '/api/search';

  // Signal to hold the search response
  searchResult = signal<SearchResponse | null>(null);

  constructor(private http: HttpClient) {
    // Set up an effect to automatically log the search result when it changes
    effect(() => {
      const result = this.searchResult();
      if (result) {
        console.log('Search Result:', result);
      }
    });
  }

  getSearchResult(
    fromStation: Station,
    toStation: Station,
    date: Date | null,
  ): void {
    let params = new HttpParams()
      .set('fromLatitude', fromStation.latitude.toString())
      .set('fromLongitude', fromStation.longitude.toString())
      .set('toLatitude', toStation.latitude.toString())
      .set('toLongitude', toStation.longitude.toString());

    if (date) {
      params = params.set('time', date.getTime().toString());
    }

    this.http.get<SearchResponse>(this.apiUrl, { params }).subscribe({
      next: (response: SearchResponse) => {
        this.searchResult.set(response); // Set the signal with the response
      },
      error: (error) => {
        console.error('Error fetching search result:', error);
      },
    });
  }
}
