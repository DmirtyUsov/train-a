import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';

import { ManagerService } from '../manager.service';
import { Station } from '../../models/station.models';
import { BoundariesMinMax, NewStation, Stations } from '../models';
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
  ],
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.scss',
})
export class StationsComponent {
  readonly latitudeBound: BoundariesMinMax = { min: -90, max: 90 };

  readonly longitudeBound: BoundariesMinMax = { min: -180, max: 180 };

  stationList$: Observable<Station[]>;

  stationsObject: Stations = this.manager.stations;

  isLoading$: Observable<boolean>;

  private subscriptions: Subscription = new Subscription();

  newStationForm = this.fb.group({
    city: ['', Validators.required],
    latitude: [
      null,
      [
        Validators.required,
        Validators.min(this.latitudeBound.min),
        Validators.max(this.latitudeBound.max),
      ],
    ],
    longitude: [
      null,
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
  ) {
    this.isLoading$ = this.manager.isLoading$;

    this.stationList$ = this.manager.loadStations();
  }

  private deleteStation(id: number): void {
    this.manager.deleteStation(id).subscribe({
      next: () => {
        this.toast.success(`Station id:${id} removed`);
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

  addStation() {
    const newStation: NewStation = {
      city: this.newStationForm.value.city || 'Smth Wrong',
      latitude: this.newStationForm.value.latitude || 0,
      longitude: this.newStationForm.value.longitude || 0,
      relations: this.newStationForm.value.connectedTo || [],
    };

    this.manager.addStation(newStation).subscribe({
      next: (id) => {
        this.toast.success(`Station id:${id} added`);
        this.newStationForm.reset();
      },
      error: (error) => {
        this.toast.error(error);
      },
    });
  }
}
