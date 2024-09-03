import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Order, OrederRequest } from '../models/order.model';

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
  ): Observable<any> {
    const orderPayload = {
      rideId,
      seat,
      stationStart,
      stationEnd,
    };
    console.log('make an order', orderPayload);
    return this.http.post<any>(this.apiUrl, orderPayload).pipe(
      tap((response) => {
        console.log('Order response:', response);
      }),
      catchError((error) => {
        console.error('Error making order:', error);
        return throwError(error);
      }),
    );
  }

  getOrders(all: boolean = false): Observable<Order[]> {
    console.log('get orders was called');
    const params = new HttpParams().set('all', String(all));
    return this.http.get<Order[]>(this.apiUrl, { params }).pipe(
      tap((response) => {
        console.log('Orders response:', response);
      }),
      catchError((error) => {
        console.error('Error retrieving orders:', error);
        return throwError(error);
      }),
    );
  }
}
