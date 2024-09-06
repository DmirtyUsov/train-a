import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { Station } from '../../../../models/station.models';
import { selectAllStations } from '../../../../store/selectors/stations.selectors';
import {
  clearSelectedRoute,
  createRoute,
  updateRoute,
} from '../../../../store/actions/route.actions';
import { CarriageService } from '../../../../services/carriage.service';
import { CarriageType } from '../../../../models/carriage.model';
import { Route } from '../../../../models/route.model';
import { selectSelectedRoute } from '../../../../store/selectors/route.selectors';

@Component({
  selector: 'app-create-route-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    ReactiveFormsModule,
    CardModule,
    DividerModule,
  ],
  templateUrl: './create-route-form.component.html',
  styleUrls: ['./create-route-form.component.scss'],
})
export class CreateRouteFormComponent implements OnInit {
  formGroup: FormGroup;

  stations!: Station[];

  stations$: Observable<Station[]>;

  carriageTypes!: CarriageType[];

  carriageTypes$: Observable<CarriageType[]> | null = null;

  stationControlNames: string[] = [];

  carriageControlNames: string[] = [];

  maxDropdowns = 10;

  showAddStationButton = true;

  showAddCarriageButton = true;

  selectedRoute: Route | null = null;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private carriageService: CarriageService,
  ) {
    this.stations$ = this.store.pipe(select(selectAllStations));
    this.formGroup = this.fb.group({});
  }

  ngOnInit(): void {
    this.stations$.subscribe((result) => {
      this.stations = result;
      this.initializeStationDropdowns(3);
    });
    this.carriageService.getCarriageTypes().subscribe((carriageTypes) => {
      this.carriageTypes = carriageTypes;
      this.initializeCarriageDropdowns(3);
    });

    // Listen for changes to selectedRoute and update the form accordingly
    this.store
      .select(selectSelectedRoute)
      .pipe(
        tap((route) => {
          console.log('Selected route:', route); // Debugging statement
          this.selectedRoute = route;
          if (this.selectedRoute) {
            this.fillFormWithRouteData(this.selectedRoute);
          } else {
            // Optionally clear the form if no route is selected
            this.clearForm();
            this.initializeStationDropdowns(3);
          }
        }),
      )
      .subscribe();
  }

  initializeStationDropdowns(count: number): void {
    for (let i = 1; i <= count; i += 1) {
      this.addStationDropdownControl(`selectedStation${i}`);
    }
    this.checkDropdownValues();
  }

  initializeCarriageDropdowns(count: number): void {
    for (let i = 1; i <= count; i += 1) {
      this.addCarriageDropdownControl(`selectedCarriage${i}`);
    }
    this.checkDropdownValues();
  }

  addStationDropdownControl(controlName: string): void {
    this.formGroup.addControl(controlName, this.fb.control(null));
    this.stationControlNames.push(controlName);
    this.checkDropdownValues();
  }

  addCarriageDropdownControl(controlName: string): void {
    this.formGroup.addControl(controlName, this.fb.control(null));
    this.carriageControlNames.push(controlName);
    this.checkDropdownValues();
  }

  addStationDropdown(): void {
    if (this.stationControlNames.length < this.maxDropdowns) {
      const newIndex = this.stationControlNames.length + 1;
      this.addStationDropdownControl(`selectedStation${newIndex}`);
    }
  }

  addCarriageDropdown(): void {
    if (this.carriageControlNames.length < this.maxDropdowns) {
      const newIndex = this.carriageControlNames.length + 1;
      this.addCarriageDropdownControl(`selectedCarriage${newIndex}`);
    }
  }

  checkDropdownValues(): void {
    this.showAddStationButton =
      this.stationControlNames.length < this.maxDropdowns;
    this.showAddCarriageButton =
      this.carriageControlNames.length < this.maxDropdowns;
  }

  fillFormWithRouteData(route: Route | null): void {
    console.log('Filling form with route data:', route); // Debugging statement

    // Clear existing controls
    this.clearForm();

    // Initialize with default number of dropdowns
    this.initializeStationDropdowns(3);
    this.initializeCarriageDropdowns(3);

    if (route) {
      const path = route.path || [];
      const carriages = route.carriages || [];

      // Add controls based on route data
      path.forEach((stationId, index) => {
        const controlName = `selectedStation${index + 1}`;
        this.formGroup
          .get(controlName)
          ?.setValue(
            this.stations.find((station) => station.id === stationId) || null,
          );
      });

      carriages.forEach((carriageCode, index) => {
        const controlName = `selectedCarriage${index + 1}`;
        this.formGroup
          .get(controlName)
          ?.setValue(
            this.carriageTypes?.find(
              (carriage) => carriage.code === carriageCode,
            ) || null,
          );
      });
    }

    this.checkDropdownValues();
  }

  ensureMinimumDropdowns(minCount: number): void {
    const currentStationCount = this.stationControlNames.length;
    const currentCarriageCount = this.carriageControlNames.length;

    // Add extra dropdowns if the current number is less than the minimum required
    for (let i = currentStationCount + 1; i <= minCount; i++) {
      this.addStationDropdownControl(`selectedStation${i}`);
    }

    for (let i = currentCarriageCount + 1; i <= minCount; i++) {
      this.addCarriageDropdownControl(`selectedCarriage${i}`);
    }
  }

  clearForm(): void {
    this.stationControlNames.forEach((name) =>
      this.formGroup.removeControl(name),
    );
    this.carriageControlNames.forEach((name) =>
      this.formGroup.removeControl(name),
    );
    this.stationControlNames = [];
    this.carriageControlNames = [];
  }

  getSelectedStations(): Station[] {
    return this.stationControlNames
      .map((controlName) => this.formGroup.get(controlName)?.value)
      .filter((station) => station !== null);
  }

  getSelectedCarriages(): CarriageType[] {
    return this.carriageControlNames
      .map((controlName) => this.formGroup.get(controlName)?.value)
      .filter((carriage) => carriage !== null);
  }

  onCancelButtonClick() {
    this.store.dispatch(clearSelectedRoute());
  }

  onSaveButtonClick(): void {
    const selectedStations = this.getSelectedStations();
    const selectedCarriages = this.getSelectedCarriages();

    const path = selectedStations.map((station) => station.id);
    const carriages = selectedCarriages.map((carriage) => carriage.code);

    const payload = {
      path,
      carriages,
    };

    this.store.dispatch(createRoute({ route: payload }));
  }

  onUpdateButtonClick(): void {
    if (this.selectedRoute) {
      const selectedStations = this.getSelectedStations();
      const selectedCarriages = this.getSelectedCarriages();

      const path = selectedStations.map((station) => station.id);
      const carriages = selectedCarriages.map((carriage) => carriage.code);

      const payload = {
        path,
        carriages,
      };

      this.store.dispatch(
        updateRoute({ routeId: this.selectedRoute.id, route: payload }),
      );
    }
  }
}
