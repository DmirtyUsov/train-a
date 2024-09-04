import { createReducer, on } from '@ngrx/store';
import {
  loadOrdersSuccess,
  loadOrdersFailure,
  makeOrderSuccess,
  makeOrderFailure,
  makeOrder,
  loadOrders,
} from '../actions/order.actions';
import { Order } from '../../models/order.model';
import { ResponseError } from '../../models/error.model';

export interface OrderState {
  orders: Order[];
  error: ResponseError | null;
  loading: boolean;
}

export const initialState: OrderState = {
  orders: [],
  error: null,
  loading: false,
};

export const orderReducer = createReducer(
  initialState,
  on(
    loadOrders,
    (state): OrderState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    loadOrdersSuccess,
    (state, { orders }): OrderState => ({
      ...state,
      orders,
      loading: false,
      error: null,
    }),
  ),
  on(
    loadOrdersFailure,
    (state, { error }): OrderState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  on(
    makeOrder,
    (state): OrderState => ({
      ...state,
      loading: true,
    }),
  ),
  on(
    makeOrderSuccess,
    (state): OrderState => ({
      ...state,
      loading: false,
      error: null,
    }),
  ),
  on(
    makeOrderFailure,
    (state, { error }): OrderState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
