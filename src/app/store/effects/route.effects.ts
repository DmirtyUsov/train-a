import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouteService } from '../../services/route.service';
import {
  loadRoutes,
  loadRoutesSuccess,
  loadRoutesFailure,
} from '../actions/route.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ResponseError } from '../../models/error.model';

@Injectable()
export class RouteEffects {
  loadRoutes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRoutes),
      switchMap(() =>
        this.routeService.getAllRoutes().pipe(
          map((routes) => loadRoutesSuccess({ routes })),
          catchError((error) => {
            const responseError: ResponseError = error.error || {
              message: 'Failed to load routes',
              reason: 'server_error',
            };
            return of(loadRoutesFailure({ error: responseError }));
          }),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private routeService: RouteService,
  ) {}
}
