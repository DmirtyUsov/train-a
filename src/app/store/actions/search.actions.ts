import { createAction, props } from '@ngrx/store';
import { Station } from '../../models/station.models';

export const selectFromStation = createAction(
  '[Search] Select From Station',
  props<{ station: Station }>(),
);

export const selectToStation = createAction(
  '[Search] Select To Station',
  props<{ station: Station }>(),
);

export const selectDate = createAction(
  '[Search] Select Date',
  props<{ date: Date }>(),
);
