import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RideService } from '../../services/ride.service';
import {
  loadRide,
  loadRideSuccess,
  loadRideFailure,
} from '../actions/ride.actions';

@Injectable()
export class RideEffects {
  loadRide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadRide),
      mergeMap((action) => {
        return this.rideService.getRide(action.rideId).pipe(
          map((ride) => {
            return loadRideSuccess({ ride });
          }),
          catchError((error) => {
            return of(loadRideFailure({ error }));
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private rideService: RideService,
  ) {}
}
