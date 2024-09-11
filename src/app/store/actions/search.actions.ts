import { createAction, props } from '@ngrx/store';
import { SearchResponseStation } from '../../models/station.models';

export const selectFromStation = createAction(
  '[Search] Select From Station',
  props<{ station: SearchResponseStation }>(),
);

export const selectToStation = createAction(
  '[Search] Select To Station',
  props<{ station: SearchResponseStation }>(),
);

export const selectDate = createAction(
  '[Search] Select Date',
  props<{ date: string }>(),
);
