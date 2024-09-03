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

export interface OrderState {
  orders: Order[];
  error: any;
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
    loading: true, // Set loading to true when starting to load orders
    error: null,
  })),
  on(loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false, // Set loading to false when orders are successfully loaded
    error: null,
  })),
  on(loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false, // Set loading to false when loading fails
    error,
  })),
  on(makeOrder, (state) => ({
    ...state,
    loading: true, // Optionally set loading to true when starting to make an order
  })),
  on(makeOrderSuccess, (state, { response }) => ({
    ...state,
    loading: false, // Set loading to false when the order is successfully made
    error: null,
  })),
  on(makeOrderFailure, (state, { error }) => ({
    ...state,
    loading: false, // Set loading to false when making an order fails
    error,
  })),
);
