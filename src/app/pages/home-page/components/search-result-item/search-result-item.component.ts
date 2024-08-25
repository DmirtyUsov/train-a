import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '../../../../models/route.model';
import { Station } from '../../../../models/station.models';
import {
  formatDate,
  formatTime,
  convertToISOFormat,
} from '../../../../helpers/date-utils';

@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
})
export class SearchResultItemComponent implements OnInit {
  @Input() item!: Route;

  @Input() fromCity!: Station;

  @Input() toCity!: Station;

  @Input() first!: boolean;

  fromStationStartTime: { date: string; time: string } | undefined;

  toStationEndTime: { date: string; time: string } | undefined;

  timeDifference: string | undefined;

  ngOnInit() {
    console.log('Item:', this.item);
    console.log('From City:', this.fromCity);
    console.log('To City:', this.toCity);
    this.logCityIndexes();
    this.setStationTimes();
    this.calculateTimeDifference();
  }

  private logCityIndexes() {
    const fromCityIndex = this.item.path.indexOf(this.fromCity.stationId);
    const toCityIndex = this.item.path.indexOf(this.toCity.stationId);

    console.log(`fromCity path index: ${fromCityIndex}`);
    console.log(`toCity path index: ${toCityIndex}`);
  }

  private setStationTimes() {
    const fromCityIndex = this.item.path.indexOf(this.fromCity.stationId);
    const toCityIndex = this.item.path.indexOf(this.toCity.stationId);

    if (
      fromCityIndex !== -1 &&
      toCityIndex !== -1 &&
      this.item.schedule.length > 0
    ) {
      const segments = this.item.schedule[0].segments;

      // For fromCity, save only the start time
      const fromSegment = segments[fromCityIndex];
      if (fromSegment) {
        this.fromStationStartTime = {
          date: formatDate(fromSegment.time[0]),
          time: formatTime(fromSegment.time[0]),
        };
      }

      // For toCity, save the end time of the previous segment
      if (toCityIndex > 0) {
        const previousSegment = segments[toCityIndex - 1];
        if (previousSegment) {
          this.toStationEndTime = {
            date: formatDate(previousSegment.time[1]),
            time: formatTime(previousSegment.time[1]),
          };
        }
      }
      // Additionally, save the end time for toCity segment itself
      const currentToSegment = segments[toCityIndex];
      if (currentToSegment) {
        this.toStationEndTime = {
          date: formatDate(currentToSegment.time[1]),
          time: formatTime(currentToSegment.time[1]),
        };
      }
    }
  }

  private calculateTimeDifference() {
    if (this.fromStationStartTime && this.toStationEndTime) {
      const startDateTimeStr = convertToISOFormat(
        `${this.fromStationStartTime.date}T${this.fromStationStartTime.time}`,
      );
      const endDateTimeStr = convertToISOFormat(
        `${this.toStationEndTime.date}T${this.toStationEndTime.time}`,
      );

      console.log('Start DateTime String:', startDateTimeStr);
      console.log('End DateTime String:', endDateTimeStr);

      const startDateTime = new Date(startDateTimeStr);
      const endDateTime = new Date(endDateTimeStr);

      console.log('Start DateTime Object:', startDateTime);
      console.log('End DateTime Object:', endDateTime);

      if (
        !isNaN(startDateTime.getTime()) &&
        !isNaN(endDateTime.getTime()) &&
        endDateTime > startDateTime
      ) {
        const startTimestamp = startDateTime.getTime();
        const endTimestamp = endDateTime.getTime();

        const diffMs = endTimestamp - startTimestamp;

        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        const remainderDays = diffDays % 7;
        const diffHours = Math.floor(
          (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const diffMinutes = Math.floor(
          (diffMs % (1000 * 60 * 60)) / (1000 * 60),
        );

        this.timeDifference = `${diffWeeks} week(s), ${remainderDays} day(s), ${diffHours} hour(s), ${diffMinutes} minute(s)`;
      } else {
        console.error(
          'Invalid date values or end time is not later than start time:',
          startDateTime,
          endDateTime,
        );
        this.timeDifference = 'Invalid time difference';
      }
    } else {
      this.timeDifference = 'Time data missing';
    }
  }
}
