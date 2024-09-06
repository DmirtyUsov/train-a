import { createReducer, on } from '@ngrx/store';
import {
  loadRoutes,
  loadRoutesSuccess,
  loadRoutesFailure,
  showCreateForm,
  hideCreateForm,
  createRouteSuccess,
  createRouteFailure,
  updateRouteSuccess,
  updateRouteFailure,
  deleteRouteSuccess,
  deleteRouteFailure,
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
  // Load Routes
  on(loadRoutes, (state) => ({ ...state, loading: true, error: null })),
  on(loadRoutesSuccess, (state, { routes }) => ({
    ...state,
    routes,
    loading: false,
  })),
  on(loadRoutesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Route
  on(createRouteSuccess, (state, { route }) => ({
    ...state,
    routes: [...state.routes, route],
    loading: false,
  })),
  on(createRouteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Route
  on(updateRouteSuccess, (state, { route }) => ({
    ...state,
    routes: state.routes.map((r) => (r.id === route.id ? route : r)),
    loading: false,
  })),
  on(updateRouteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Route
  on(deleteRouteSuccess, (state, { routeId }) => ({
    ...state,
    routes: state.routes.filter((r) => r.id !== routeId),
    loading: false,
  })),
  on(deleteRouteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
