import { createReducer, on } from '@ngrx/store';
import {
  loadRide,
  loadRideSuccess,
  loadRideFailure,
  selectSeat,
} from '../actions/ride.actions';
import { Ride } from '../../models/ride.model';
import { ResponseError } from '../../models/error.model';

export interface RideState {
  ride: Ride | null;
  loading: boolean;
  error: ResponseError | null;
  selectedCarriage: number | null;
  selectedSeat: number | null;
}

export const initialState: RideState = {
  ride: null,
  loading: false,
  error: null,
  selectedCarriage: null,
  selectedSeat: null,
};

export const rideReducer = createReducer(
  initialState,
  on(
    loadRide,
    (state): RideState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    loadRideSuccess,
    (state, { ride }): RideState => ({
      ...state,
      loading: false,
      ride,
    }),
  ),
  on(
    loadRideFailure,
    (state, { error }): RideState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  on(
    selectSeat,
    (state, { carriageIndex, seatNumber }): RideState => ({
      ...state,
      selectedCarriage: carriageIndex,
      selectedSeat: seatNumber,
    }),
  ),
);
