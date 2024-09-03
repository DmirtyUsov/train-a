import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RideState } from '../reducers/ride.reducer';

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
