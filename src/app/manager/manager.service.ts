import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
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
import { NewStation, Stations } from './models';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  refreshStations$: Subject<void> = new Subject();

  public stations: Stations = {};

  constructor(private backend: BackendService) {}

  loadStations(): Observable<Station[]> {
    this.isLoading$$.next(true);
    return this.refreshStations$.pipe(
      startWith(undefined),
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
  }

  deleteStation(id: number) {
    this.isLoading$$.next(true);
    return this.backend.deleteStation(id).pipe(
      map((data) => data),
      finalize(() => this.refreshStations$.next()),
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
