import { createAction, props } from '@ngrx/store';
import { Route } from '../../models/route.model';
import { ResponseError } from '../../models/error.model';

// Load Routes Actions
export const loadRoutes = createAction('[Route] Load Routes');
export const loadRoutesSuccess = createAction(
  '[Route] Load Routes Success',
  props<{ routes: Route[] }>(),
);
export const loadRoutesFailure = createAction(
  '[Route] Load Routes Failure',
  props<{ error: ResponseError }>(),
);

// Create Route Actions
export const createRoute = createAction(
  '[Route] Create Route',
  props<{ route: Partial<Route> }>(),
);
export const createRouteSuccess = createAction(
  '[Route] Create Route Success',
  props<{ route: Route }>(),
);
export const createRoutePartialSuccess = createAction(
  '[Route] Create Route Partial Success',
  props<{ route: Route }>(),
);
export const createRouteFailure = createAction(
  '[Route] Create Route Failure',
  props<{ error: ResponseError }>(),
);

// Update Route Actions
export const updateRoute = createAction(
  '[Route] Update Route',
  props<{ routeId: number; route: Partial<Route> }>(),
);
export const updateRouteSuccess = createAction(
  '[Route] Update Route Success',
  props<{ route: Route }>(),
);
export const updateRouteFailure = createAction(
  '[Route] Update Route Failure',
  props<{ error: ResponseError }>(),
);

// Delete Route Actions
export const deleteRoute = createAction(
  '[Route] Delete Route',
  props<{ routeId: number }>(),
);
export const deleteRouteSuccess = createAction(
  '[Route] Delete Route Success',
  props<{ routeId: number }>(),
);
export const deleteRouteFailure = createAction(
  '[Route] Delete Route Failure',
  props<{ error: ResponseError }>(),
);

export const showCreateForm = createAction('[Route] Show Create Form');
export const hideCreateForm = createAction('[Route] Hide Create Form');
