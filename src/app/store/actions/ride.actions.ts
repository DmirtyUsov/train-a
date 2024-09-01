import { createAction, props } from '@ngrx/store';
import { Ride } from '../../models/ride.model';

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
  props<{ error: any }>(),
);
