import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from '../reducers/order.reducer';
import { Order } from '../../models/order.model';
import { getDepartureTime } from '../../helpers/trip.helpers';

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

export const selectSortedOrders = createSelector(
  selectAllOrders,
  (orders: Order[]) => {
    return [...orders].sort((a, b) => {
      const departureTimeA = getDepartureTime(a);
      const departureTimeB = getDepartureTime(b);
      return departureTimeA.getTime() - departureTimeB.getTime();
    });
  },
);
