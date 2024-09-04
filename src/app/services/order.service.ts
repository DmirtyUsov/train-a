import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MakeOrderResponse, Order, OrederRequest } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = '/api/order';

  constructor(private http: HttpClient) {}

  makeOrder(
    rideId: number,
    seat: number,
    stationStart: number,
    stationEnd: number,
  ): Observable<MakeOrderResponse> {
    const orderPayload = {
      rideId,
      seat,
      stationStart,
      stationEnd,
    };
    return this.http.post<MakeOrderResponse>(this.apiUrl, orderPayload).pipe(
      catchError((error) => {
        return throwError(error);
      }),
    );
  }

  getOrders(all: boolean = false): Observable<Order[]> {
    const params = new HttpParams().set('all', String(all));
    return this.http.get<Order[]>(this.apiUrl, { params }).pipe(
      catchError((error) => {
        return throwError(error);
      }),
    );
  }
}
