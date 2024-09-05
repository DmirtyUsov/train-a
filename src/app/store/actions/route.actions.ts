import { createAction, props } from '@ngrx/store';
import { Route } from '../../models/route.model';
import { ResponseError } from '../../models/error.model';

export const loadRoutes = createAction('[Route] Load Routes');

export const loadRoutesSuccess = createAction(
  '[Route] Load Routes Success',
  props<{ routes: Route[] }>(),
);

export const loadRoutesFailure = createAction(
  '[Route] Load Routes Failure',
  props<{ error: ResponseError }>(),
);
