import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { EMPTY, Observable, combineLatest } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  selectRide,
  selectSelectedCarriage,
  selectSelectedSeat,
  selectRidePrice,
} from '../../../../store/selectors/ride.selectors';

import {
  clearSelection,
  selectSeat,
} from '../../../../store/actions/ride.actions';
import { selectSelectedItem } from '../../../../store/selectors/search-result.selectors';
import { makeOrder } from '../../../../store/actions/order.actions';

@Component({
  selector: 'app-book-seat',
  standalone: true,
  imports: [ButtonModule, CommonModule, DividerModule],
  templateUrl: './book-seat.component.html',
  styleUrls: ['./book-seat.component.scss'],
})
export class BookSeatComponent {
  selectedCarriage$: Observable<number | null>;

  selectedSeat$: Observable<number | null>;

  selectedPrice$: Observable<number | null>;

  constructor(private store: Store) {
    this.selectedCarriage$ = this.store.select(selectSelectedCarriage);
    this.selectedSeat$ = this.store.select(selectSelectedSeat);
    this.selectedPrice$ = this.store.select(selectRidePrice);
  }

  clearSelectedSeat(): void {
    this.store.dispatch(selectSeat({ carriageIndex: null, seatNumber: null }));
  }

  onBookButtonClicked(): void {
    combineLatest([
      this.store.select(selectRide),
      this.store.select(selectSelectedSeat),
      this.store.select(selectSelectedItem),
    ])
      .pipe(
        take(1),
        map(([ride, seat, selectedItem]) => {
          if (ride && seat && selectedItem) {
            const { rideId } = ride;
            const seatNumber = seat;
            const { stationId: fromStationId } = selectedItem.fromStation;
            const { stationId: toStationId } = selectedItem.toStation;
            return { rideId, seatNumber, fromStationId, toStationId };
          }
          return null;
        }),
        filter(
          (
            orderData,
          ): orderData is {
            rideId: number;
            seatNumber: number;
            fromStationId: number;
            toStationId: number;
          } => !!orderData,
        ),
        switchMap(({ rideId, seatNumber, fromStationId, toStationId }) => {
          this.store.dispatch(
            makeOrder({
              rideId,
              seat: seatNumber,
              stationStart: fromStationId,
              stationEnd: toStationId,
            }),
          );
          this.store.dispatch(clearSelection());
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
