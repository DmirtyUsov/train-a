import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SearchResponseStation } from '../../../../models/station.models';
import {
  selectDateSelected,
  selectFromStationSelected,
  selectToStationSelected,
} from '../../../../store/selectors/search.selectors';
import { loadStations } from '../../../../store/actions/stations.actions';
import { selectAllStations } from '../../../../store/selectors/stations.selectors';
import { transformStations } from '../../../../helpers/search-result.helpers';
import { loadSearchResults } from '../../../../store/actions/search-result.actions';
import {
  selectDate,
  selectFromStation,
  selectToStation,
} from '../../../../store/actions/search.actions';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    DropdownModule,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  formGroup: FormGroup;

  fromStations: SearchResponseStation[] = [];

  toStations: SearchResponseStation[] = [];

  date$: Observable<Date | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.formGroup = this.fb.group({
      selectedFromStation: [null],
      selectedToStation: [null],
      date: [null],
    });

    this.date$ = this.store
      .select(selectDateSelected)
      .pipe(map((dateString) => (dateString ? new Date(dateString) : null)));
  }

  ngOnInit(): void {
    this.store.dispatch(loadStations());

    this.store
      .select(selectAllStations)
      .pipe(
        filter((stations) => stations.length > 0),
        map((stations) => transformStations(stations)),
      )
      .subscribe((transformedStations) => {
        this.fromStations = transformedStations;
        this.toStations = transformedStations;
      });

    this.store
      .select(selectFromStationSelected)
      .subscribe((selectedStation) => {
        this.formGroup.patchValue({ selectedFromStation: selectedStation });
      });

    this.store.select(selectToStationSelected).subscribe((selectedStation) => {
      this.formGroup.patchValue({ selectedToStation: selectedStation });
    });

    this.date$.subscribe((date) => {
      if (date) {
        this.formGroup.patchValue({ date });
      }
    });
  }

  onSubmit(): void {
    const { selectedFromStation, selectedToStation, date } =
      this.formGroup.value;
    const isoDate = date ? new Date(date).toISOString() : null;

    if (selectedFromStation && selectedToStation) {
      this.store.dispatch(
        loadSearchResults({
          fromStation: selectedFromStation,
          toStation: selectedToStation,
          date: isoDate,
        }),
      );
    }
  }

  onFromStationChange(event: { value: SearchResponseStation }): void {
    const selectedStation = event.value;
    if (selectedStation) {
      this.store.dispatch(selectFromStation({ station: selectedStation }));
    }
  }

  onToStationChange(event: { value: SearchResponseStation }): void {
    const selectedStation = event.value;
    if (selectedStation) {
      this.store.dispatch(selectToStation({ station: selectedStation }));
    }
  }

  onDateChange(event: Date): void {
    const isoDate = event.toISOString();
    if (event) {
      this.store.dispatch(selectDate({ date: isoDate }));
    }
  }
}
