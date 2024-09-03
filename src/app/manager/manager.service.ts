import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
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
import { BackendResponse, City, NewStation, Stations } from './models';
import { ApiNinjasService } from '../services/api-ninjas.service';
import { CarriageType } from '../models/carriage.model';

export const INPUT_DEBOUNCE_MS = 700;

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  private isFindingCity$$ = new BehaviorSubject<boolean>(false);

  public isFindingCity$: Observable<boolean> =
    this.isFindingCity$$.asObservable();

  refreshStations$: Subject<string> = new Subject();

  deleteStationAction$: Subject<number> = new Subject();

  addStationAction$: Subject<NewStation> = new Subject();

  inputCityAction$: Subject<string> = new Subject();

  refreshCarriages$: Subject<string> = new Subject();

  deleteCarriageAction$: Subject<string> = new Subject();

  addCarriageAction$: Subject<CarriageType> = new Subject();

  updateCarriageAction$: Subject<CarriageType> = new Subject();

  public stations: Stations = {};

  constructor(
    private backend: BackendService,
    private apiNinjas: ApiNinjasService,
  ) {}

  stations$: Observable<Station[]> = this.refreshStations$.pipe(
    debounceTime(INPUT_DEBOUNCE_MS),
    startWith(undefined),
    tap(() => this.isLoading$$.next(true)),
    switchMap(() =>
      this.backend.getStations().pipe(
        tap((chunk) => {
          if (chunk.payload) {
            chunk.payload.reduce(
              (stationsObject: Stations, station: Station) => {
                this.stations[station.id] = station;
                return stationsObject;
              },
              {},
            );
          }
        }),
        map((data) => (data.payload ? data.payload : [])),
        finalize(() => this.isLoading$$.next(false)),
      ),
    ),
  );

  afterDeleteStationAction$: Observable<BackendResponse<number | null>> =
    this.deleteStationAction$.pipe(
      tap(() => this.isLoading$$.next(true)),
      switchMap((id) =>
        this.backend
          .deleteStation(id)
          .pipe(finalize(() => this.isLoading$$.next(false))),
      ),
    );

  afterAddStationAction$: Observable<BackendResponse<number | null>> =
    this.addStationAction$.pipe(
      tap(() => this.isLoading$$.next(true)),
      switchMap((newStation) =>
        this.backend
          .addStation(newStation)
          .pipe(finalize(() => this.isLoading$$.next(false))),
      ),
    );

  afterCityInputAction$: Observable<BackendResponse<City[] | null>> =
    this.inputCityAction$.pipe(
      debounceTime(INPUT_DEBOUNCE_MS),
      distinctUntilChanged(),
      filter((value) => value.trim().length > 0),
      tap(() => this.isFindingCity$$.next(true)),
      switchMap((city) =>
        this.apiNinjas
          .getCoordinatesByCity(city)
          .pipe(finalize(() => this.isFindingCity$$.next(false))),
      ),
    );

  carriages$: Observable<CarriageType[]> = this.refreshCarriages$.pipe(
    startWith(undefined),
    tap(() => this.isLoading$$.next(true)),
    switchMap(() =>
      this.backend.getCarriages().pipe(
        map((data) => (data.payload ? data.payload : [])),
        finalize(() => this.isLoading$$.next(false)),
      ),
    ),
  );

  afterDeleteCarriageAction$: Observable<BackendResponse<null>> =
    this.deleteCarriageAction$.pipe(
      tap(() => this.isLoading$$.next(true)),
      switchMap((code) =>
        this.backend
          .deleteCarriage(code)
          .pipe(finalize(() => this.isLoading$$.next(false))),
      ),
    );

  afterAddCarriageAction$: Observable<BackendResponse<string | null>> =
    this.addCarriageAction$.pipe(
      tap(() => this.isLoading$$.next(true)),
      switchMap((carriage) =>
        this.backend
          .addCarriage(carriage)
          .pipe(finalize(() => this.isLoading$$.next(false))),
      ),
    );

  afterUpdateCarriageAction$: Observable<BackendResponse<string | null>> =
    this.updateCarriageAction$.pipe(
      tap(() => this.isLoading$$.next(true)),
      switchMap((carriage) =>
        this.backend
          .updateCarriage(carriage)
          .pipe(finalize(() => this.isLoading$$.next(false))),
      ),
    );
}
