import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  formatDate,
  formatTime,
  convertToISOFormat,
} from '../../../../helpers/date-utils';
import { RouteDialogComponent } from '../route-dialog/route-dialog.component';
import { SearchItem } from '../../../../models/search-item.model';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [CommonModule, RouteDialogComponent, DividerModule, ChipModule],
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
        console.error(
          'Invalid date values or end time is not later than start time:',
          startDateTime,
          endDateTime,
        );
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
}
