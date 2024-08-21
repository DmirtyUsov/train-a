import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from '../models/station.models';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private apiUrl = '/api/station';

  constructor(private http: HttpClient) {}

  getAllStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.apiUrl);
  }
}
