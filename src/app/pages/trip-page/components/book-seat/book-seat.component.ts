import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { EMPTY, Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  selectSelectedCarriage,
  selectSelectedSeat,
  selectRidePrice,
  selectOrderData,
} from '../../../../store/selectors/ride.selectors';

import {
  clearSelection,
  selectSeat,
} from '../../../../store/actions/ride.actions';
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
    this.store
      .select(selectOrderData)
      .pipe(
        take(1),
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
          return EMPTY;
        }),
      )
      .subscribe();
    this.store.dispatch(clearSelection());
  }
}
