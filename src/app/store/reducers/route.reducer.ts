import { createReducer, on } from '@ngrx/store';
import {
  loadRoutes,
  loadRoutesSuccess,
  loadRoutesFailure,
  showCreateForm,
  hideCreateForm,
  deleteRouteFailure,
  deleteRouteSuccess,
  deleteRoute,
  updateRouteFailure,
  updateRouteSuccess,
  updateRoute,
  createRouteFailure,
  createRouteSuccess,
  createRoute,
  createRoutePartialSuccess,
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
  // Load routes
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

  // Create new route
  on(
    createRoute,
    (state): RouteState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    createRouteSuccess,
    (state, { route }): RouteState => ({
      ...state,
      routes: [...state.routes, route],
      loading: false,
      error: null,
    }),
  ),
  on(createRoutePartialSuccess, (state, { route }) => {
    const updatedRoutes = [...state.routes];
    const index = updatedRoutes.findIndex((r) => r.id === route.id);
    if (index === -1) {
      updatedRoutes.push(route);
    } else {
      updatedRoutes[index] = route;
    }
    return {
      ...state,
      routes: updatedRoutes,
      loading: false,
      error: null,
    };
  }),
  on(
    createRouteFailure,
    (state, { error }): RouteState => ({
      ...state,
      loading: false,
      error,
    }),
  ),

  // Update existing route
  on(
    updateRoute,
    (state): RouteState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    updateRouteSuccess,
    (state, { route }): RouteState => ({
      ...state,
      routes: state.routes.map((r) => (r.id === route.id ? route : r)),
      loading: false,
      error: null,
    }),
  ),
  on(
    updateRouteFailure,
    (state, { error }): RouteState => ({
      ...state,
      loading: false,
      error,
    }),
  ),

  // Delete a route
  on(
    deleteRoute,
    (state): RouteState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    deleteRouteSuccess,
    (state, { routeId }): RouteState => ({
      ...state,
      routes: state.routes.filter((route) => route.id !== routeId),
      loading: false,
      error: null,
    }),
  ),
  on(
    deleteRouteFailure,
    (state, { error }): RouteState => ({
      ...state,
      loading: false,
      error,
    }),
  ),

  // Show and hide create form
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
