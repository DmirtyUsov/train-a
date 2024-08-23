import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../models/station.models';
import { SearchResponse } from '../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private apiUrl = '/api/search';

  constructor(private http: HttpClient) {}

  getSearchResult(
    fromStation: Station,
    toStation: Station,
    date: Date | null,
  ): Observable<SearchResponse> {
    let params = new HttpParams()
      .set('fromLatitude', fromStation.latitude.toString())
      .set('fromLongitude', fromStation.longitude.toString())
      .set('toLatitude', toStation.latitude.toString())
      .set('toLongitude', toStation.longitude.toString());

    if (date) {
      params = params.set('time', date.getTime().toString());
    }

    return this.http.get<SearchResponse>(this.apiUrl, { params });
  }
}
