import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import { loadStations } from '../../store/actions/stations.actions';
import { selectAllStations } from '../../store/selectors/stations.selectors';
import { SearchService } from '../../services/search.service';
import { CommonModule } from '@angular/common';

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

    // Initialize observables
    this.store
      .select(selectAllStations)
      .pipe(
        filter((stations) => stations !== null),
        map((stations) => {
          const cities = Array.from(
            new Set(stations.map((station) => station.city)),
          ).map((city) => ({ name: city, code: city }));

          this.fromCities = cities;
          this.toCities = cities;

          return cities;
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.store.dispatch(loadStations());
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form Value:', this.formGroup.value);
      this.searchService.getSearchResult();
    } else {
      console.error('Form is invalid');
    }
  }

  onFromCityChange(event: any): void {
    const selectedCity = event.value;
    console.log('Selected From City:', selectedCity);
  }

  // Method to handle the change event for 'To' dropdown
  onToCityChange(event: any): void {
    const selectedCity = event.value;
    console.log('Selected To City:', selectedCity);
  }
}
