import { Component } from '@angular/core';
import { SearchFormComponent } from '../components/search-form/search-form.component';
import { SearchResultBlockComponent } from '../components/search-result-block/search-result-block.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [SearchFormComponent, SearchResultBlockComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
