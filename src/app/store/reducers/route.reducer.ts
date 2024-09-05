import { createReducer, on } from '@ngrx/store';
import {
  loadRoutes,
  loadRoutesSuccess,
  loadRoutesFailure,
  showCreateForm,
  hideCreateForm,
} from '../actions/route.actions';
import { Route } from '../../models/route.model';
import { ResponseError } from '../../models/error.model';

export interface RouteState {
  routes: Route[];
  error: ResponseError | null;
  loading: boolean;
  isCreateFormVisible: boolean;
}

export const initialState: RouteState = {
  routes: [],
  error: null,
  loading: false,
  isCreateFormVisible: false,
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
  on(
    showCreateForm,
    (state): RouteState => ({
      ...state,
      isCreateFormVisible: true,
    }),
  ),
  on(
    hideCreateForm,
    (state): RouteState => ({
      ...state,
      isCreateFormVisible: false,
    }),
  ),
);
