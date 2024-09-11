import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchResponseStation } from '../models/station.models';
import { SearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = '/api/search';

  constructor(private http: HttpClient) {}

  getSearchResult(
    fromStation: SearchResponseStation,
    toStation: SearchResponseStation,
    date: string | null,
  ): Observable<SearchResponse> {
    let params = new HttpParams()
      .set('fromLatitude', fromStation.geolocation.latitude.toString())
      .set('fromLongitude', fromStation.geolocation.longitude.toString())
      .set('toLatitude', toStation.geolocation.latitude.toString())
      .set('toLongitude', toStation.geolocation.longitude.toString());

    if (date) {
      params = params.set('time', date);
    }

    return this.http.get<SearchResponse>(this.apiUrl, { params });
  }
}
