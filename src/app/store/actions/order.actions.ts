// order.actions.ts
import { createAction, props } from '@ngrx/store';
import { MakeOrderResponse, Order } from '../../models/order.model';
import { ResponseError } from '../../models/error.model';

// Actions for GET orders
export const loadOrders = createAction(
  '[Order] Load Orders',
  props<{ all?: boolean }>(),
);

export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ orders: Order[] }>(),
);

export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: ResponseError }>(),
);

export const makeOrder = createAction(
  '[Order] Make Order',
  props<{
    rideId: number;
    seat: number;
    stationStart: number;
    stationEnd: number;
  }>(),
);

export const makeOrderSuccess = createAction(
  '[Order] Make Order Success',
  props<{ response: MakeOrderResponse }>(),
);

export const makeOrderFailure = createAction(
  '[Order] Make Order Failure',
  props<{ error: ResponseError }>(),
);
