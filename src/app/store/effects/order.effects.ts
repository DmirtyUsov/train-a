import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadOrders,
  loadOrdersFailure,
  loadOrdersSuccess,
  makeOrder,
  makeOrderFailure,
  makeOrderSuccess,
} from '../actions/order.actions';
import { OrderService } from '../../services/order.service';

@Injectable()
export class OrderEffects {
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrders),
      switchMap(({ all }) =>
        this.orderService.getOrders(all).pipe(
          map((orders) => loadOrdersSuccess({ orders })),
          catchError((error) => of(loadOrdersFailure({ error }))),
        ),
      ),
    ),
  );

  makeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(makeOrder),
      switchMap(({ rideId, seat, stationStart, stationEnd }) =>
        this.orderService
          .makeOrder(rideId, seat, stationStart, stationEnd)
          .pipe(
            map((response) => makeOrderSuccess({ response })),
            catchError((error) => of(makeOrderFailure({ error }))),
          ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
  ) {}
}
