import { Injectable, signal, effect } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, mockRequest } from '../models/search.model';

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

  getSearchResult(): void {
    let params = new HttpParams()
      .set('fromLatitude', mockRequest.fromLatitude.toString())
      .set('fromLongitude', mockRequest.fromLongitude.toString())
      .set('toLatitude', mockRequest.toLatitude.toString())
      .set('toLongitude', mockRequest.toLongitude.toString());

    if (mockRequest.time) {
      params = params.set('time', mockRequest.time.toString());
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
