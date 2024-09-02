import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  selectRidePrice,
  selectSelectedCarriage,
  selectSelectedSeat,
} from '../../../../store/selectors/ride.selectors';
import { selectSeat } from '../../../../store/actions/ride.actions';

@Component({
  selector: 'app-book-seat',
  standalone: true,
  imports: [ButtonModule, CommonModule, DividerModule],
  templateUrl: './book-seat.component.html',
  styleUrls: ['./book-seat.component.scss'],
})
export class BookSeatComponent implements OnInit {
  selectedSeatInfo$: Observable<{
    carNumber: number;
    seatNumber: number;
  } | null>;

  selectedPrice$: Observable<number | null>;

  constructor(private store: Store) {
    this.selectedSeatInfo$ = combineLatest([
      this.store.select(selectSelectedCarriage),
      this.store.select(selectSelectedSeat),
    ]).pipe(
      map(([carNumber, seatNumber]) => {
        if (carNumber !== null && seatNumber !== null) {
          return { carNumber, seatNumber };
        }
        return null;
      }),
    );

    this.selectedPrice$ = this.store.select(selectRidePrice);
  }

  ngOnInit(): void {}

  clearSelectedSeat(): void {
    this.store.dispatch(selectSeat({ carriageIndex: null, seatNumber: null }));
  }
}
