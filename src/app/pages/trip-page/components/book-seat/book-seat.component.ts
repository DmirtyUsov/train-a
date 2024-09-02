import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { selectSeat } from '../../../../store/actions/ride.actions';
import {
  selectRidePrice,
  selectSelectedCarriage,
  selectSelectedSeat,
} from '../../../../store/selectors/ride.selectors';

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
}
