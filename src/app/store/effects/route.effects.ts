import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouteService } from '../../services/route.service';
import {
  loadRoutes,
  loadRoutesSuccess,
  loadRoutesFailure,
  createRoute,
  createRouteSuccess,
  createRouteFailure,
  updateRoute,
  updateRouteSuccess,
  updateRouteFailure,
  deleteRoute,
  deleteRouteSuccess,
  deleteRouteFailure,
} from '../actions/route.actions';
import { ResponseError } from '../../models/error.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RouteEffects {
  // Load Routes Effect
  loadRoutes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRoutes),
      switchMap(() =>
        this.routeService.getAllRoutes().pipe(
          map((routes) => loadRoutesSuccess({ routes })),
          catchError((error) =>
            of(loadRoutesFailure({ error: this.formatError(error) })),
          ),
        ),
      ),
    );
  });

  // Create Route Effect
  createRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createRoute),
      switchMap(({ route }) =>
        this.routeService.createRoute(route).pipe(
          map((newRoute) => createRouteSuccess({ route: newRoute })),
          catchError((error) =>
            of(createRouteFailure({ error: this.formatError(error) })),
          ),
        ),
      ),
    );
  });

  // Update Route Effect
  updateRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateRoute),
      switchMap(({ routeId, route }) =>
        this.routeService.updateRoute(routeId, route).pipe(
          map((updatedRoute) => updateRouteSuccess({ route: updatedRoute })),
          catchError((error) =>
            of(updateRouteFailure({ error: this.formatError(error) })),
          ),
        ),
      ),
    );
  });

  // Delete Route Effect
  deleteRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteRoute),
      switchMap(({ routeId }) =>
        this.routeService.deleteRoute(routeId).pipe(
          map(() => deleteRouteSuccess({ routeId })),
          catchError((error) =>
            of(deleteRouteFailure({ error: this.formatError(error) })),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private routeService: RouteService,
  ) {}

  // Helper function to format errors
  private formatError(error: HttpErrorResponse): ResponseError {
    return (
      error.error || { message: 'An error occurred', reason: 'unknown_error' }
    );
  }
}
