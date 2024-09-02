import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpStatusCode } from '@angular/common/http';

import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { ManagerService } from '../manager.service';
import { Station } from '../../models/station.models';
import { BoundariesMinMax, City, NewStation, Stations } from '../models';
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
    MultiSelectModule,
    InputNumberModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
})
export class StationsComponent implements OnInit, OnDestroy {
  readonly latitudeBound: BoundariesMinMax = { min: -90, max: 90 };

  readonly longitudeBound: BoundariesMinMax = { min: -180, max: 180 };

  readonly cityBound: BoundariesMinMax = { min: 2, max: 255 };

  stationList$: Observable<Station[]> = this.manager.stations$;

  stationsObject: Stations = this.manager.stations;

  isLoading$: Observable<boolean> = this.manager.isLoading$;

  isFindingCity: Observable<boolean> = this.manager.isFindingCity$;

  cityInput$ = new Subject<string>();

  private subscriptions: Subscription = new Subscription();

  newStationForm = this.fb.group({
    city: ['', [Validators.required, Validators.minLength(this.cityBound.min)]],
    latitude: [
      0,
      [
        Validators.required,
        Validators.min(this.latitudeBound.min),
        Validators.max(this.latitudeBound.max),
      ],
    ],
    longitude: [
      0,
      [
        Validators.required,
        Validators.min(this.longitudeBound.min),
        Validators.max(this.longitudeBound.max),
      ],
    ],
    connectedTo: [[], Validators.required],
  });

  constructor(
    private manager: ManagerService,
    private confirmationService: ConfirmationService,
    private toast: ToastService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.manager.afterDeleteStationAction$.subscribe((response) => {
        if (response.code === HttpStatusCode.Ok) {
          this.toast.success(`Station removed`);
          this.manager.refreshStations$.next(
            `after delete ${response.payload}`,
          );
        } else {
          this.toast.error(response.error!.message);
        }
      }),
    );

    this.subscriptions.add(
      this.manager.afterAddStationAction$.subscribe((response) => {
        if (response.code === HttpStatusCode.Ok) {
          this.toast.success(`New Station id:${response.payload} added`);
          this.manager.refreshStations$.next(`after add ${response.payload}`);
          this.newStationForm.reset();
        } else {
          this.toast.error(response.error!.message);
        }
      }),
    );

    this.subscriptions.add(
      this.manager.afterCityInputAction$.subscribe((response) => {
        if (
          response.code === HttpStatusCode.Ok &&
          response.payload!.length > 0
        ) {
          const city: City = response.payload![0];
          this.newStationForm.controls.city.setValue(city.name);
          this.newStationForm.controls.latitude.setValue(city.latitude);
          this.newStationForm.controls.longitude.setValue(city.longitude);
        }
        if (response.error) {
          this.toast.error(response.error!.message);
        }
      }),
    );
  }

  setCity(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    if (value.length >= this.cityBound.min) {
      this.manager.inputCityAction$.next(value);
    }
  }

  private deleteStation(id: number): void {
    this.manager.deleteStationAction$.next(id);
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

  addStation(): void {
    const newStation: NewStation = {
      city: this.newStationForm.value.city || 'Smth Wrong',
      latitude: this.newStationForm.value.latitude || 0,
      longitude: this.newStationForm.value.longitude || 0,
      relations: this.newStationForm.value.connectedTo || [],
    };
    const newCityLower = newStation.city.toLowerCase();
    const isCityInList = Object.values(this.stationsObject).some(
      (station) => station.city.toLowerCase() === newCityLower,
    );
    if (isCityInList) {
      this.toast.error(
        `Station "${newStation.city.toUpperCase()}" already in list.`,
      );
    } else {
      this.manager.addStationAction$.next(newStation);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
