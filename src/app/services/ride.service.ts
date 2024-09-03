import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ride } from '../models/ride.model';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private readonly API_URL = '/api/search';

  constructor(private http: HttpClient) {}

  getRide(rideId: number): Observable<Ride> {
    return this.http.get<Ride>(`${this.API_URL}/${rideId}`);
  }
}
