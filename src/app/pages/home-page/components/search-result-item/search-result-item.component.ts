import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '../../../../models/route.model';
import { Station } from '../../../../models/station.models';

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
  weeks = 0;
  days = 0;
  hours = 0;
  minutes = 0;

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
          date: this.formatDate(fromSegment.time[0]),
          time: this.formatTime(fromSegment.time[0]),
        };
      }

      // For toCity, save the end time of the previous segment
      if (toCityIndex > 0) {
        const previousSegment = segments[toCityIndex - 1];
        if (previousSegment) {
          this.toStationEndTime = {
            date: this.formatDate(previousSegment.time[1]),
            time: this.formatTime(previousSegment.time[1]),
          };
        }
      }
      // Additionally, save the end time for toCity segment itself
      const currentToSegment = segments[toCityIndex];
      if (currentToSegment) {
        this.toStationEndTime = {
          date: this.formatDate(currentToSegment.time[1]),
          time: this.formatTime(currentToSegment.time[1]),
        };
      }
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
    }
    return date.toLocaleDateString(); // Adjust format if needed
  }

  private formatTime(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private calculateTimeDifference() {
    if (this.fromStationStartTime && this.toStationEndTime) {
      const startDateTimeStr = this.convertToISOFormat(
        `${this.fromStationStartTime.date}T${this.fromStationStartTime.time}`,
      );
      const endDateTimeStr = this.convertToISOFormat(
        `${this.toStationEndTime.date}T${this.toStationEndTime.time}`,
      );

      const startDateTime = new Date(startDateTimeStr);
      const endDateTime = new Date(endDateTimeStr);

      if (
        !isNaN(startDateTime.getTime()) &&
        !isNaN(endDateTime.getTime()) &&
        endDateTime > startDateTime
      ) {
        const diffMs = endDateTime.getTime() - startDateTime.getTime();

        // Calculate total difference in minutes
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

  private convertToISOFormat(dateTimeStr: string): string {
    // Convert from DD.MM.YYYYTHH:mm to YYYY-MM-DDTHH:mm:ss
    const [date, time] = dateTimeStr.split('T');
    const [day, month, year] = date.split('.');
    return `${year}-${month}-${day}T${time}:00`;
  }
}
