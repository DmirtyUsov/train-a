import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';
import { Station } from '../models/station.models';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  constructor(private backend: BackendService) {}

  loadStations(): Observable<Station[]> {
    this.isLoading$$.next(true);
    return this.backend.getStations().pipe(
      map((data) => data),
      finalize(() => this.isLoading$$.next(false)),
    );
  }

  deleteStation(id: number) {
    this.isLoading$$.next(true);
    return this.backend.deleteStation(id).pipe(
      map((data) => data),
      finalize(() => this.isLoading$$.next(false)),
    );
  }
}
