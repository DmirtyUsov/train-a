// order.actions.ts
import { createAction, props } from '@ngrx/store';
import { Order } from '../../models/order.model';

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
  props<{ error: any }>(),
);

// Actions for POST order
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
  props<{ response: any }>(),
);

export const makeOrderFailure = createAction(
  '[Order] Make Order Failure',
  props<{ error: any }>(),
);
