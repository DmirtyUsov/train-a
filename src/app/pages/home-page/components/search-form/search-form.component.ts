import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { loadStations } from '../../../../store/actions/stations.actions';
import { selectAllStations } from '../../../../store/selectors/stations.selectors';
import { SearchService } from '../../../../services/search.service';
import { Station } from '../../../../models/station.models';
import {
  selectDate,
  selectFromStation,
  selectToStation,
} from '../../../../store/actions/search.actions';
import {
  selectDateSelected,
  selectFromStationSelected,
  selectToStationSelected,
} from '../../../../store/selectors/search.selectors';
import { loadSearchResults } from '../../../../store/actions/search-result.actions';

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

  fromStations: Station[] = [];

  toStations: Station[] = [];

  allStations$: Observable<Station[]>;

  fromStation$: Observable<Station | null>;

  toStation$: Observable<Station | null>;

  date$: Observable<Date | null>;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private store: Store,
  ) {
    this.formGroup = this.fb.group({
      selectedFromStation: [null],
      selectedToStation: [null],
      date: [null],
    });

    this.allStations$ = this.store.select(selectAllStations);
    this.fromStation$ = this.store.select(selectFromStationSelected);
    this.toStation$ = this.store.select(selectToStationSelected);
    this.date$ = this.store.select(selectDateSelected);

    this.allStations$
      .pipe(
        filter((stations) => stations.length > 0),
        map((stations) => {
          this.fromStations = stations;
          this.toStations = stations;
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(loadStations());
  }

  onSubmit(): void {
    this.fromStation$
      .pipe(
        switchMap((fromStation) =>
          this.toStation$.pipe(
            switchMap((toStation) =>
              this.date$.pipe(
                map((date) => ({ fromStation, toStation, date })),
              ),
            ),
          ),
        ),
      )
      .subscribe(({ fromStation, toStation, date }) => {
        console.log('Dispatching loadSearchResults:', {
          fromStation,
          toStation,
          date,
        });
        if (fromStation && toStation) {
          //this.searchService.getSearchResult(fromStation, toStation, date);
          this.store.dispatch(
            loadSearchResults({ fromStation, toStation, date }),
          );
        }
      });
  }

  onFromStationChange(event: { value: Station }): void {
    const selectedStation = event.value;
    if (selectedStation) {
      this.store.dispatch(selectFromStation({ station: selectedStation }));
    }
  }

  onToStationChange(event: { value: Station }): void {
    const selectedStation = event.value;
    if (selectedStation) {
      this.store.dispatch(selectToStation({ station: selectedStation }));
    }
  }

  onDateChange(event: Date): void {
    const selectedDate = event;
    if (selectedDate) {
      this.store.dispatch(selectDate({ date: selectedDate }));
    }
  }
}
