import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchResponse } from '../../../../models/search.model';
import { selectSearchResult } from '../../../../store/selectors/search-result.selectors';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-search-result-block',
  standalone: true,
  imports: [CommonModule, DataViewModule],
  templateUrl: './search-result-block.component.html',
  styleUrls: ['./search-result-block.component.scss'],
})
export class SearchResultBlockComponent {
  searchResult$: Observable<SearchResponse | null>;

  constructor(private store: Store) {
    this.searchResult$ = this.store.pipe(select(selectSearchResult));
  }
}
