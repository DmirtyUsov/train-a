import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule } from 'primeng/dataview';
import { SearchResultItemComponent } from '../search-result-item/search-result-item.component';
import {
  selectSearchItems,
  selectSelectedItem,
} from '../../../../store/selectors/search-result.selectors';
import { SearchItem } from '../../../../models/search-item.model';
import { Tab } from '../../../../models/tab.model';

@Component({
  selector: 'app-search-result-block',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    SearchResultItemComponent,
    TabViewModule,
  ],
  templateUrl: './search-result-block.component.html',
  styleUrls: ['./search-result-block.component.scss'],
  providers: [DatePipe],
})
export class SearchResultBlockComponent implements OnInit {
  searchItems$: Observable<SearchItem[]>;

  selectedItem$: Observable<SearchItem | null>;

  tabs: Tab[] = [];

  activeIndex = 0;

  constructor(
    private store: Store,
    private datePipe: DatePipe,
  ) {
    this.searchItems$ = this.store.select(selectSearchItems);
    this.selectedItem$ = this.store.select(selectSelectedItem);
  }

  ngOnInit(): void {
    this.searchItems$.subscribe((items) => {
      if (items.length > 0) {
        this.groupSearchItemsByDay(items);
      }
    });
  }

  private groupSearchItemsByDay(searchItems: SearchItem[]): void {
    const groupedItems = new Map<string, SearchItem[]>();

    searchItems.forEach((item) => {
      const day = item.deparchureTime.toDateString();
      if (!groupedItems.has(day)) {
        groupedItems.set(day, []);
      }
      groupedItems.get(day)?.push(item);
    });

    const sortedEntries = Array.from(groupedItems.entries()).sort(
      ([dateA], [dateB]) => {
        const dA = new Date(dateA);
        const dB = new Date(dateB);
        return dA.getTime() - dB.getTime();
      },
    );

    this.tabs = sortedEntries.map(([day, items]) => {
      const date = new Date(day);
      const formattedDate = this.datePipe.transform(date, 'MMMM dd');
      const dayName = this.datePipe.transform(date, 'EEEE');
      return {
        title: `${formattedDate} (${dayName})`,
        items,
      };
    });
  }
}
