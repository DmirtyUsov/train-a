import { Component } from '@angular/core';
import { SearchFormComponent } from '../../../components/search-form/search-form.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SearchFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
