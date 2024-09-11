import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import {
  formatDate,
  formatTime,
  convertToISOFormat,
} from '../../../../helpers/date-utils';
import { RouteDialogComponent } from '../route-dialog/route-dialog.component';
import { SearchItem } from '../../../../models/search-item.model';
import { selectSearchItem } from '../../../../store/actions/search-result.actions';
import { CarriageClassPipe } from '../../../../pipes/carriage-class.pipe';
import {
  calculateCarriagePrices,
  findStationIndices,
} from '../../../../helpers/trip.helpers';

@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [
    CommonModule,
    RouteDialogComponent,
    DividerModule,
    ChipModule,
    CurrencyPipe,
    CarriageClassPipe,
  ],
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
})
export class SearchResultItemComponent implements OnInit {
  @Input() item!: SearchItem;

  fromStationStartTime: { date: string; time: string } | undefined;

  toStationEndTime: { date: string; time: string } | undefined;

  weeks = 0;

  days = 0;

  hours = 0;

  minutes = 0;

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit() {
    this.setStationTimes();
    this.calculateTimeDifference();
  }

  private setStationTimes() {
    const departureTimeString = this.item.deparchureTime.toISOString();
    const arrivalTimeString = this.item.arrivalTime.toISOString();

    this.fromStationStartTime = {
      date: formatDate(departureTimeString),
      time: formatTime(departureTimeString),
    };

    this.toStationEndTime = {
      date: formatDate(arrivalTimeString),
      time: formatTime(arrivalTimeString),
    };
  }

  private calculateTimeDifference() {
    if (this.fromStationStartTime && this.toStationEndTime) {
      const startDateTimeStr = convertToISOFormat(
        `${this.fromStationStartTime.date}T${this.fromStationStartTime.time}`,
      );
      const endDateTimeStr = convertToISOFormat(
        `${this.toStationEndTime.date}T${this.toStationEndTime.time}`,
      );

      const startDateTime = new Date(startDateTimeStr);
      const endDateTime = new Date(endDateTimeStr);

      if (
        !Number.isNaN(startDateTime.getTime()) &&
        !Number.isNaN(endDateTime.getTime()) &&
        endDateTime > startDateTime
      ) {
        const startTimestamp = startDateTime.getTime();
        const endTimestamp = endDateTime.getTime();

        const diffMs = endTimestamp - startTimestamp;

        const diffInMinutes = Math.floor(diffMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInWeeks = Math.floor(diffInDays / 7);

        this.weeks = diffInWeeks;
        this.days = diffInDays % 7;
        this.hours = diffInHours % 24;
        this.minutes = diffInMinutes % 60;
      } else {
        this.weeks = 0;
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
      }
    } else {
      this.weeks = 0;
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
    }
  }

  onSearchItemClick(event: Event, item: SearchItem): void {
    const target = event.target as HTMLElement;
    const routeDialogElement = document.querySelector(
      'app-route-dialog',
    ) as HTMLElement;

    if (routeDialogElement && routeDialogElement.contains(target)) {
      return;
    }

    const fromStationId = item.fromStation.stationId;
    const toStationId = item.toStation.stationId;
    this.store.dispatch(selectSearchItem({ selectedItem: item }));
    this.router.navigate([`/trip/${item.rideId}`], {
      queryParams: {
        from: fromStationId,
        to: toStationId,
      },
    });
  }

  getCarriagePrice(carriageType: string): number {
    const [startSegmentIndex, endSegmentIndex] = findStationIndices(
      this.item.fromStation.stationId,
      this.item.toStation.stationId,
      this.item.route.path,
    );

    const calculatedPrice = calculateCarriagePrices(
      this.item.schedule.segments,
      startSegmentIndex,
      endSegmentIndex,
    );

    const priceForCarriageType = calculatedPrice.get(carriageType);

    return priceForCarriageType !== undefined ? priceForCarriageType : 0;
  }
}
