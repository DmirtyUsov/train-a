import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { SearchService } from '../../services/search.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [DropdownModule, ReactiveFormsModule, CalendarModule, ButtonModule],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent {
  formGroup: FormGroup;

  cities: { name: string; code: string }[] = [
    { name: 'Paris', code: 'PAR' },
    { name: 'Madrid', code: 'MAD' },
    { name: 'London', code: 'LDN' },
    { name: 'New York', code: 'NYC' },
  ];

  constructor(
    private fb: FormBuilder,
    private searchService: SearchService,
  ) {
    this.formGroup = this.fb.group({
      selectedFromCity: [null],
      selectedToCity: [null],
      date: [null],
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      console.log('Form Value:', this.formGroup.value);
      this.searchService.getSearchResult();
    } else {
      console.error('Form is invalid');
    }
  }
}
