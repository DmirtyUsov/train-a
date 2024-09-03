// order.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  loadOrdersSuccess,
  loadOrdersFailure,
  makeOrderSuccess,
  makeOrderFailure,
} from '../actions/order.actions';
import { Order } from '../../models/order.model';

export interface OrderState {
  orders: Order[];
  error: any;
}

export const initialState: OrderState = {
  orders: [],
  error: null,
};

export const orderReducer = createReducer(
  initialState,
  on(loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    error: null,
  })),
  on(loadOrdersFailure, (state, { error }) => ({ ...state, error })),
  on(makeOrderSuccess, (state, { response }) => ({ ...state, error: null })),
  on(makeOrderFailure, (state, { error }) => ({ ...state, error })),
);
