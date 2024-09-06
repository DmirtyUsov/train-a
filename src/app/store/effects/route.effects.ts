import { Injectable } from '@angular/core';
import { concat, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouteService } from '../../services/route.service';
import {
  loadRoutes,
  loadRoutesSuccess,
  loadRoutesFailure,
  createRoute,
  createRouteFailure,
  updateRoute,
  updateRouteSuccess,
  updateRouteFailure,
  deleteRoute,
  deleteRouteSuccess,
  deleteRouteFailure,
  createRoutePartialSuccess,
  hideCreateForm,
} from '../actions/route.actions';
import { formatError } from '../../helpers/route.helpers';
import { ToastService } from '../../services/toast.service';

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
            of(loadRoutesFailure({ error: formatError(error) })),
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
          switchMap((newRoute) => {
            this.toastService.success('New Route created successfully!');

            // Return actions sequentially
            return concat(
              of(createRoutePartialSuccess({ route: newRoute })),
              of(hideCreateForm()), // Hides the form
              of(loadRoutes()), // Reloads routes
            );
          }),
          catchError((error) => {
            this.toastService.error(error.message || 'Failed to create route.');
            return of(createRouteFailure({ error: formatError(error) }));
          }),
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
            of(updateRouteFailure({ error: formatError(error) })),
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
          map(() => {
            this.toastService.success('Route deleted successfully!');
            return deleteRouteSuccess({ routeId });
          }),
          catchError((error) => {
            this.toastService.error(error.message || 'Failed to delete route.');
            return of(deleteRouteFailure({ error: formatError(error) }));
          }),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private routeService: RouteService,
    private toastService: ToastService,
  ) {}
}
