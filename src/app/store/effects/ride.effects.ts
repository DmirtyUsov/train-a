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
  loadRide$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRide),
      mergeMap((action) =>
        this.rideService.getRide(action.rideId).pipe(
          map((ride) => loadRideSuccess({ ride })),
          catchError((error) => of(loadRideFailure({ error }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private rideService: RideService,
  ) {}
}
