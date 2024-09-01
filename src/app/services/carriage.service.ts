import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CarriageType {
  code: string;
  name: string;
  rows: number;
  leftSeats: number;
  rightSeats: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarriageService {
  private readonly apiUrl = '/api/carriage';

  constructor(private http: HttpClient) {}

  getCarriageTypes(): Observable<CarriageType[]> {
    return this.http.get<CarriageType[]>(this.apiUrl);
  }
}
