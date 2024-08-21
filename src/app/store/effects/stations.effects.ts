import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as StationsActions from '../actions/stations.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StationsService } from '../../services/stations.service';
import { Station } from '../../models/station.models';

@Injectable()
export class StationsEffects {
  constructor(
    private actions$: Actions,
    private stationsService: StationsService,
  ) {}

  loadStations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StationsActions.loadStations),
      mergeMap(() =>
        this.stationsService.getAllStations().pipe(
          map((stations: Station[]) =>
            StationsActions.loadStationsSuccess({ stations }),
          ),
          catchError((error) =>
            of(StationsActions.loadStationsFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
