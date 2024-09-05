import { createReducer, on } from '@ngrx/store';
import {
  loadRoutes,
  loadRoutesSuccess,
  loadRoutesFailure,
} from '../actions/route.actions';
import { Route } from '../../models/route.model';
import { ResponseError } from '../../models/error.model';

export interface RouteState {
  routes: Route[];
  error: ResponseError | null;
  loading: boolean;
}

export const initialState: RouteState = {
  routes: [],
  error: null,
  loading: false,
};

export const routeReducer = createReducer(
  initialState,
  on(
    loadRoutes,
    (state): RouteState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    loadRoutesSuccess,
    (state, { routes }): RouteState => ({
      ...state,
      routes,
      loading: false,
      error: null,
    }),
  ),
  on(
    loadRoutesFailure,
    (state, { error }): RouteState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
