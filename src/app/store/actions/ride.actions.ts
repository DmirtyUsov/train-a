import { createAction, props } from '@ngrx/store';
import { Ride } from '../../models/ride.model';
import { ResponseError } from '../../models/error.model';

export const loadRide = createAction(
  '[Ride] Load Ride',
  props<{ rideId: number }>(),
);

export const loadRideSuccess = createAction(
  '[Ride] Load Ride Success',
  props<{ ride: Ride }>(),
);

export const loadRideFailure = createAction(
  '[Ride] Load Ride Failure',
  props<{ error: ResponseError }>(),
);

export const selectSeat = createAction(
  '[Ride] Select Seat',
  props<{ carriageIndex: number; seatNumber: number }>(),
);
