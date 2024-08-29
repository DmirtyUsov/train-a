import { Component, OnDestroy } from '@angular/core';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';

import { ManagerService } from '../manager.service';
import { Station } from '../../models/station.models';
import { Stations } from '../models';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [
    AsyncPipe,
    DecimalPipe,
    TableModule,
    ProgressSpinnerModule,
    TagModule,
    ButtonModule,
    ConfirmPopupModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
})
export class StationsComponent implements OnDestroy {
  stationList$: Observable<Station[]>;

  stationsObject$: Observable<Stations>;

  stationsObject: Stations = {};

  isLoading$: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();

  private refreshStations$: Subject<void> = new Subject();

  newStationForm = this.fb.group({
    city: ['', Validators.required],
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
    connectedTo: ['', Validators.required],
  });

  constructor(
    private manager: ManagerService,
    private confirmationService: ConfirmationService,
    private toast: ToastService,
    private fb: FormBuilder,
  ) {
    this.isLoading$ = this.manager.isLoading$;

    this.stationList$ = this.manager.loadStations();

    this.stationsObject$ = this.stationList$.pipe(
      map((station) =>
        station.reduce((stationsObject: Stations, data: Station) => {
          // eslint-disable-next-line no-param-reassign
          stationsObject[data.id] = data;
          return stationsObject;
        }, {}),
      ),
    );

    this.subscriptions.add(
      this.stationsObject$.subscribe((stations) => {
        this.stationsObject = stations;
      }),
    );
  }

  private deleteStation(id: number): void {
    this.manager.deleteStation(id).subscribe({
      next: () => {
        this.toast.success(`Station id:${id} removed`);
        this.refreshStations$.next();
      },
      error: (error) => {
        this.toast.error(error);
      },
    });
  }

  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      key: `popupConfirmDelete-${id}`,
      target: event.target as EventTarget,
      message: 'Are you sure?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.deleteStation(id);
      },
      reject: () => {},
    });
  }

  addStation() {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
