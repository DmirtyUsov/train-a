import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { BackendResponse } from '../models/backend-response.model';
import { City } from '../manager/models';
import { BackendService } from './backend.service';

const API_KEY = '8tsHrZIEsi9cIWi/KYAc2A==cbHsgN15c62Poofg';

@Injectable({
  providedIn: 'root',
})
export class ApiNinjasService {
  constructor(private http: HttpClient) {}

  getCoordinatesByCity(
    city: string,
  ): Observable<BackendResponse<City[] | null>> {
    const url = `https://api.api-ninjas.com/v1/city?name=${city}`;
    const headers = { 'X-Api-Key': API_KEY };

    return this.http.get<City[]>(url, { headers }).pipe(
      map((payload) => ({
        payload,
        code: HttpStatusCode.Ok,
        error: null,
      })),
      catchError(BackendService.handleError),
    );
  }
}
