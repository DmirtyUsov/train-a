import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from '../models/route.model';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  private apiUrl = '/api/route';

  constructor(private http: HttpClient) {}

  getAllRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.apiUrl);
  }

  createRoute(route: Partial<Route>): Observable<Route> {
    return this.http.post<Route>(this.apiUrl, route);
  }

  updateRoute(routeId: number, route: Partial<Route>): Observable<Route> {
    return this.http.put<Route>(`${this.apiUrl}/${routeId}`, route);
  }

  deleteRoute(routeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${routeId}`);
  }
}
