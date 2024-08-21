import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { loadStations } from '../../store/actions/stations.actions';
import { selectAllStations } from '../../store/selectors/stations.selectors';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';
import { Station } from '../../models/station.models';
import {
  selectDate,
  selectFromStation,
  selectToStation,
} from '../../store/actions/search.actions';

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
  fromCities: { name: string; code: string }[] = [];
  toCities: { name: string; code: string }[] = [];
  allStations$: Observable<Station[]>;

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
    private store: Store,
  ) {
    this.formGroup = this.fb.group({
      selectedFromCity: [null],
      selectedToCity: [null],
      date: [null],
    });

    this.allStations$ = this.store.select(selectAllStations);

    this.allStations$
      .pipe(
        filter((stations) => stations !== null),
        map((stations) => {
          const uniqueCities = Array.from(
            new Set(stations.map((station) => station.city)),
          );
          this.fromCities = uniqueCities.map((city) => ({
            name: city,
            code: city,
          }));
          this.toCities = uniqueCities.map((city) => ({
            name: city,
            code: city,
          }));
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(loadStations());
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.searchService.getSearchResult();
    } else {
      console.error('Form is invalid');
    }
  }

  onFromCityChange(event: any): void {
    const selectedCityName = event.value;
    this.allStations$
      .pipe(
        map((stations) =>
          stations.find((station) => station.city === selectedCityName.name),
        ),
      )
      .subscribe((selectedStation) => {
        if (selectedStation) {
          this.store.dispatch(selectFromStation({ station: selectedStation }));
        }
      });
  }

  onToCityChange(event: any): void {
    const selectedCityName = event.value;
    this.allStations$
      .pipe(
        map((stations) =>
          stations.find((station) => station.city === selectedCityName.name),
        ),
      )
      .subscribe((selectedStation) => {
        if (selectedStation) {
          this.store.dispatch(selectToStation({ station: selectedStation }));
        }
      });
  }

  onDateChange(event: any): void {
    const selectedDate = event.value;
    if (selectedDate) {
      this.store.dispatch(selectDate({ date: new Date(selectedDate) }));
    }
  }
}
