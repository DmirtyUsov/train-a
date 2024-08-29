import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { loadStations } from '../../../../store/actions/stations.actions';
import { selectTransformedStations } from '../../../../store/selectors/stations.selectors';
import { SearchResponseStation } from '../../../../models/station.models';
import {
  selectDate,
  selectFromStation,
  selectToStation,
} from '../../../../store/actions/search.actions';
import {
  selectFromStationSelected,
  selectMappedDate,
  selectToStationSelected,
} from '../../../../store/selectors/search.selectors';
import { loadSearchResults } from '../../../../store/actions/search-result.actions';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    AutoCompleteModule,
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

  allStations$: Observable<SearchResponseStation[]>;

  fromStation$: Observable<SearchResponseStation | null>;

  toStation$: Observable<SearchResponseStation | null>;

  date$: Observable<Date | null>;

  fromStations: SearchResponseStation[] = [];

  toStations: SearchResponseStation[] = [];

  filteredFromStations: SearchResponseStation[] = [];

  filteredToStations: SearchResponseStation[] = [];

  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.formGroup = this.fb.group({
      selectedFromStation: [null, Validators.required],
      selectedToStation: [null, Validators.required],
      date: [null, Validators.required],
    });

    this.allStations$ = this.store.select(selectTransformedStations);
    this.fromStation$ = this.store.select(selectFromStationSelected);
    this.toStation$ = this.store.select(selectToStationSelected);
    this.date$ = this.store.select(selectMappedDate);
    this.minDate = new Date();

    this.allStations$
      .pipe(
        filter((stations) => stations.length > 0),
        map((stations) => {
          this.fromStations = stations;
          this.toStations = stations;
          this.filteredFromStations = stations;
          this.filteredToStations = stations;
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(loadStations());

    this.fromStation$
      .pipe(
        tap((selectedStation) => {
          this.formGroup.patchValue({ selectedFromStation: selectedStation });
        }),
      )
      .subscribe();

    this.toStation$
      .pipe(
        tap((selectedStation) => {
          this.formGroup.patchValue({ selectedToStation: selectedStation });
        }),
      )
      .subscribe();

    this.date$
      .pipe(
        tap((date) => {
          if (date) {
            this.formGroup.patchValue({ date });
          }
        }),
      )
      .subscribe();
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

  filterFromStation(event: { query: string }): void {
    this.filteredFromStations = this.fromStations.filter((station) =>
      station.city.toLowerCase().includes(event.query.toLowerCase()),
    );
  }

  filterToStation(event: { query: string }): void {
    this.filteredToStations = this.toStations.filter((station) =>
      station.city.toLowerCase().includes(event.query.toLowerCase()),
    );
  }
}
