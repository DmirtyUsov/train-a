import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  finalize,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { BackendService } from '../services/backend.service';
import { Station } from '../models/station.models';
import { BackendResponse, NewStation, Stations } from './models';
import { HttpStatusCode } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  refreshStations$: Subject<void> = new Subject();

  public stations: Stations = {};

  constructor(private backend: BackendService) {}

  stations$: Observable<Station[]> = this.refreshStations$.pipe(
    startWith(this.isLoading$$.next(true)),
    switchMap(() =>
      this.backend.getStations().pipe(
        tap((chunk) =>
          chunk.reduce((stationsObject: Stations, station: Station) => {
            this.stations[station.id] = station;
            return stationsObject;
          }, {}),
        ),
        map((data) => data),
        finalize(() => this.isLoading$$.next(false)),
      ),
    ),
  );

  deleteStation(id: number): Observable<BackendResponse<number>> {
    this.isLoading$$.next(true);
    return this.backend.deleteStation(id).pipe(
      tap(console.log),
      map((data) => data),
      tap((data) => {
        if (data.code === HttpStatusCode.Ok) {
          this.refreshStations$.next();
        } else {
          this.isLoading$$.next(false);
        }
      }),
    );
  }

  addStation(newStation: NewStation) {
    this.isLoading$$.next(true);
    return this.backend.addStation(newStation).pipe(
      map((data) => data),
      finalize(() => this.refreshStations$.next()),
    );
  }
}
