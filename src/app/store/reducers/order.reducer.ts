// order.reducer.ts
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
  on(loadOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
    error: null,
  })),
  on(loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(makeOrder, (state) => ({
    ...state,
    loading: true,
  })),
  on(makeOrderSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(makeOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
