import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
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
import { ToastService } from '../../services/toast.service';

import { ResponseError } from '../../models/error.model';

@Injectable()
export class OrderEffects {
  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadOrders),
      switchMap(({ all }) =>
        this.orderService.getOrders(all).pipe(
          map((orders) => loadOrdersSuccess({ orders })),
          catchError((error) => of(loadOrdersFailure({ error }))),
        ),
      ),
    );
  });

  makeOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(makeOrder),
      switchMap(({ rideId, seat, stationStart, stationEnd }) =>
        this.orderService
          .makeOrder(rideId, seat, stationStart, stationEnd)
          .pipe(
            map((response) => makeOrderSuccess({ response })),
            catchError((error: HttpErrorResponse) => {
              const responseError: ResponseError = error.error || {
                message: 'Unknown error occurred',
                reason: 'unknown',
              };
              return of(makeOrderFailure({ error: responseError }));
            }),
          ),
      ),
    );
  });

  showOrderSuccessToast$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(makeOrderSuccess),
        tap(() => {
          this.toastService.success('Order successfully placed!');
        }),
      );
    },
    { dispatch: false },
  );

  showOrderFailureToast$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(makeOrderFailure),
        tap(({ error }) => {
          this.toastService.error(error.message || 'Error occurred!');
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private toastService: ToastService,
  ) {}
}
