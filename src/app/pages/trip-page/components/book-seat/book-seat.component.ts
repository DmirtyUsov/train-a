import { Component } from '@angular/core';
import { EMPTY, Observable, combineLatest } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { OrderService } from '../../../../services/order.service';
import {
  selectRide,
  selectSelectedCarriage,
  selectSelectedSeat,
  selectRidePrice,
} from '../../../../store/selectors/ride.selectors';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import {
  clearSelection,
  selectSeat,
} from '../../../../store/actions/ride.actions';
import { selectSelectedItem } from '../../../../store/selectors/search-result.selectors';
import { makeOrder } from '../../../../store/actions/order.actions';
import { ToastService } from '../../../../services/toast.service';

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

  constructor(
    private store: Store,
    private toastService: ToastService,
  ) {
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
            const rideId = ride.rideId;
            const seatNumber = seat;
            const fromStationId = selectedItem.fromStation.stationId;
            const toStationId = selectedItem.toStation.stationId;
            return { rideId, seatNumber, fromStationId, toStationId };
          }
          return null;
        }),
        filter((orderData) => !!orderData),
        switchMap((orderData) => {
          if (orderData) {
            const { rideId, seatNumber, fromStationId, toStationId } =
              orderData;
            this.store.dispatch(
              makeOrder({
                rideId,
                seat: seatNumber,
                stationStart: fromStationId,
                stationEnd: toStationId,
              }),
            );
            this.store.dispatch(clearSelection());
          }
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
