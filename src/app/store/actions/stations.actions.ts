import { createAction, props } from '@ngrx/store';
import { Station } from '../../models/station.models';

export const loadStations = createAction('[Stations] Load Stations');
export const loadStationsSuccess = createAction(
  '[Stations] Load Stations Success',
  props<{ stations: Station[] }>(),
);
export const loadStationsFailure = createAction(
  '[Stations] Load Stations Failure',
  props<{ error: Error }>(),
);
