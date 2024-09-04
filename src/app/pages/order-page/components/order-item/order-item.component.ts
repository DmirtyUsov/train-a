import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Order } from '../../../../models/order.model';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { selectAllStations } from '../../../../store/selectors/stations.selectors';
import { map } from 'rxjs';
import { Station } from '../../../../models/station.models';
import {
  calculateCarriagePrices,
  findStationIndices,
} from '../../../../helpers/trip.helpers';
import {
  convertToISOFormat,
  formatDate,
  formatTime,
} from '../../../../helpers/date-utils';
import { CarriageService } from '../../../../services/carriage.service';
import { CarriageType } from '../../../../models/carriage.model';
import { CarriageClassPipe } from '../../../../pipes/carriage-class.pipe';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [
    DividerModule,
    CardModule,
    CommonModule,
    DatePipe,
    CarriageClassPipe,
    CurrencyPipe,
  ],
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {
  @Input()
  order!: Order;

  stationStart: string = '';
  stationEnd: string = '';
  departureTime: string = '';
  arrivalTime: string = '';
  tripDuration: string = '';
  carriageType: string = '';
  carNumber: number = 0;
  seatNumber: number = 0;
  price: number = 0;

  fromStationStartTime: { date: string; time: string } | undefined;

  toStationEndTime: { date: string; time: string } | undefined;

  weeks = 0;

  days = 0;

  hours = 0;

  minutes = 0;

  constructor(
    private store: Store,
    private carriageService: CarriageService,
  ) {}

  ngOnInit(): void {
    this.carriageService.getCarriageTypes().subscribe((carriageTypes) => {
      const seatInfo = this.buildTrainScheme(
        carriageTypes,
        this.order.carriages,
        this.order.seatId,
      );
      if (seatInfo) {
        this.carriageType = seatInfo.carType;
        this.carNumber = seatInfo.carIndex + 1;
        this.seatNumber = seatInfo.seatNumberInCar;
        this.getOrderPrice();
      } else {
        console.log('Seat ID is out of bounds');
      }
    });

    this.setStationCities();
    console.log('Order:', this.order);
    const [startSegmentIndex, endSegmentIndex] = findStationIndices(
      this.order.stationStart,
      this.order.stationEnd,
      this.order.path,
    );
    console.log(startSegmentIndex, endSegmentIndex);
    this.departureTime =
      this.order.schedule.segments[startSegmentIndex].time[0];
    this.arrivalTime = this.order.schedule.segments[endSegmentIndex].time[1];

    this.setStationTimes();
    this.calculateTimeDifference();
  }

  buildTrainScheme(
    carriageTypes: CarriageType[],
    carriages: string[],
    seatId: number,
  ): { carIndex: number; carType: string; seatNumberInCar: number } | null {
    let currentSeatCount = 0;

    for (let carIndex = 0; carIndex < carriages.length; carIndex++) {
      const carriageCode = carriages[carIndex];
      const carriageType = carriageTypes.find(
        (type) => type.code === carriageCode,
      );

      if (!carriageType) continue;

      const seatsInCarriage =
        carriageType.rows * (carriageType.leftSeats + carriageType.rightSeats);

      if (seatId <= currentSeatCount + seatsInCarriage) {
        const seatNumberInCar = seatId - currentSeatCount;
        return {
          carIndex,
          carType: carriageType.name,
          seatNumberInCar,
        };
      }

      currentSeatCount += seatsInCarriage;
    }

    return null; // If the seatId is out of bounds
  }

  private setStationCities(): void {
    this.store
      .select(selectAllStations)
      .pipe(
        map((stations: Station[]) => {
          const startStation = stations.find(
            (station) => station.id === this.order.stationStart,
          );
          const endStation = stations.find(
            (station) => station.id === this.order.stationEnd,
          );
          this.stationStart = startStation?.city.toUpperCase() || 'Unknown';
          this.stationEnd = endStation?.city.toUpperCase() || 'Unknown';
        }),
      )
      .subscribe();
  }

  private setStationTimes() {
    this.fromStationStartTime = {
      date: formatDate(this.departureTime),
      time: formatTime(this.departureTime),
    };

    this.toStationEndTime = {
      date: formatDate(this.arrivalTime),
      time: formatTime(this.arrivalTime),
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

  getOrderPrice() {
    const [startSegmentIndex, endSegmentIndex] = findStationIndices(
      this.order.stationStart,
      this.order.stationEnd,
      this.order.path,
    );

    const calculatedPrice = calculateCarriagePrices(
      this.order.schedule.segments,
      startSegmentIndex,
      endSegmentIndex,
    );

    const priceForCarriageType = calculatedPrice.get(this.carriageType);

    if (priceForCarriageType !== undefined) {
      this.price = priceForCarriageType;
    } else {
      console.log(`No price found for carriage type: ${this.carriageType}`);
    }
  }
}
