import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../reducers/order.reducer';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectAllOrders = createSelector(
  selectOrderState,
  (state: OrderState) => state.orders,
);

export const selectOrderError = createSelector(
  selectOrderState,
  (state: OrderState) => state.error,
);

export const selectOrderLoading = createSelector(
  selectOrderState,
  (state: OrderState) => state.loading,
);
