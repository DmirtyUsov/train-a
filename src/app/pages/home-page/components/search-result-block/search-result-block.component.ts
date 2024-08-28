import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { SearchResultItemComponent } from '../search-result-item/search-result-item.component';

import { selectSearchResult } from '../../../../store/selectors/search-result.selectors';
import { mapCarriages } from '../../../../helpers/search-result.helpers';
import { SearchResponse } from '../../../../models/search-response.model';
import { SearchItem } from '../../../../models/search-item.model';

@Component({
  selector: 'app-search-result-block',
  standalone: true,
  imports: [CommonModule, DataViewModule, SearchResultItemComponent],
  templateUrl: './search-result-block.component.html',
  styleUrls: ['./search-result-block.component.scss'],
})
export class SearchResultBlockComponent implements OnInit {
  searchResult$: Observable<SearchResponse | null>;

  searchItems: SearchItem[] = [];

  constructor(private store: Store) {
    this.searchResult$ = this.store.select(selectSearchResult);
  }

  ngOnInit(): void {
    this.searchResult$.subscribe((result) => {
      console.log('Search result data:', result);
      if (result != null) {
        this.parseSearchResponse(result);
      }
    });
  }

  private parseSearchResponse(response: SearchResponse): void {
    this.searchItems = [];

    response.routes.forEach((route) => {
      route.schedule.forEach((schedule) => {
        const fromStationIndex = route.path.indexOf(response.from.stationId);
        const segmentIndex = Math.min(
          fromStationIndex,
          schedule.segments.length - 1,
        );

        const searchItem: SearchItem = {
          route,
          schedule,
          rideId: schedule.rideId,
          fromStation: response.from,
          toStation: response.to,
          deparchureTime: new Date(schedule.segments[segmentIndex].time[0]),
          arrivalTime: new Date(
            schedule.segments[schedule.segments.length - 1].time[1],
          ),
          carriages: mapCarriages(route, schedule, segmentIndex),
        };

        this.searchItems.push(searchItem);
      });
    });
  }
}
