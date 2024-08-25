import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchResponse } from '../../../../models/search.model';
import { selectSearchResult } from '../../../../store/selectors/search-result.selectors';
import { SearchResultItemComponent } from '../search-result-item/search-result-item.component';

@Component({
  selector: 'app-search-result-block',
  standalone: true,
  imports: [CommonModule, DataViewModule, SearchResultItemComponent],
  templateUrl: './search-result-block.component.html',
  styleUrls: ['./search-result-block.component.scss'],
})
export class SearchResultBlockComponent {
  searchResult$: Observable<SearchResponse | null>;

  constructor(private store: Store) {
    this.searchResult$ = this.store.select(selectSearchResult);

    this.searchResult$.subscribe((result) => {
      console.log('Search result data:', result);
    });
  }
}
