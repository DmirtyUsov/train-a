import { createReducer, on } from '@ngrx/store';
import {
  loadRide,
  loadRideSuccess,
  loadRideFailure,
} from '../actions/ride.actions';
import { Ride } from '../../models/ride.model';

export interface RideState {
  ride: Ride | null;
  loading: boolean;
  error: any;
}

export const initialState: RideState = {
  ride: null,
  loading: false,
  error: null,
};

export const rideReducer = createReducer(
  initialState,
  on(loadRide, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadRideSuccess, (state, { ride }) => ({
    ...state,
    loading: false,
    ride,
  })),
  on(loadRideFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
