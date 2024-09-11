import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RideState } from '../reducers/ride.reducer';
import { selectSelectedItem } from './search-result.selectors';

export const selectRideState = createFeatureSelector<RideState>('ride');

export const selectRide = createSelector(
  selectRideState,
  (state: RideState) => state.ride,
);

export const selectRideLoading = createSelector(
  selectRideState,
  (state: RideState) => state.loading,
);

export const selectRideError = createSelector(
  selectRideState,
  (state: RideState) => state.error,
);

export const selectSelectedCarriage = createSelector(
  selectRideState,
  (state: RideState) => state.selectedCarriage,
);

export const selectSelectedSeat = createSelector(
  selectRideState,
  (state: RideState) => state.selectedSeat,
);

export const selectRidePrice = createSelector(
  selectRideState,
  (state: RideState) => state.ridePrice,
);

export const selectBookingData = createSelector(
  selectRide,
  selectSelectedSeat,
  (ride, seat) => ({ ride, seat }),
);

export const selectOrderData = createSelector(
  selectBookingData,
  selectSelectedItem,
  (bookingData, selectedItem) => {
    if (bookingData.ride && bookingData.seat && selectedItem) {
      const { rideId } = bookingData.ride;
      const seatNumber = bookingData.seat;
      const { stationId: fromStationId } = selectedItem.fromStation;
      const { stationId: toStationId } = selectedItem.toStation;
      return { rideId, seatNumber, fromStationId, toStationId };
    }
    return null;
  },
);
