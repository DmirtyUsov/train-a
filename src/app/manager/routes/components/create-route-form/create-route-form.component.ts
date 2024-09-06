import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { Station } from '../../../../models/station.models';
import { selectAllStations } from '../../../../store/selectors/stations.selectors';
import { createRoute } from '../../../../store/actions/route.actions';
import { CarriageService } from '../../../../services/carriage.service';
import { CarriageType } from '../../../../models/carriage.model';

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

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private carriageService: CarriageService,
  ) {
    this.stations$ = this.store.select(selectAllStations);
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
}
