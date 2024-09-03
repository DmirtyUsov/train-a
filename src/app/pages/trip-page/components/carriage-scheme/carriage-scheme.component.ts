import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CarriageType } from '../../../../models/carriage.model';
import {
  selectSelectedCarriage,
  selectSelectedSeat,
} from '../../../../store/selectors/ride.selectors';
import { selectSeat } from '../../../../store/actions/ride.actions';

@Component({
  selector: 'app-carriage-scheme',
  standalone: true,
  imports: [CommonModule, DividerModule],
  templateUrl: './carriage-scheme.component.html',
  styleUrls: ['./carriage-scheme.component.scss'],
})
export class CarriageSchemeComponent implements OnInit {
  @Input() carriageIndex!: number;

  @Input() carriageInfo!: CarriageType | undefined;

  leftSeatNumbers: number[][] = [];

  rightSeatNumbers: number[][] = [];

  selectedSeat$: Observable<number | null> =
    this.store.select(selectSelectedSeat);

  selectedCarriage$: Observable<number | null> = this.store.select(
    selectSelectedCarriage,
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.carriageInfo) {
      this.generateSeatNumbers();
    }
  }

  generateSeatNumbers(): void {
    if (!this.carriageInfo) return;

    const { leftSeats, rightSeats, rows } = this.carriageInfo;

    const totalSeats = (leftSeats + rightSeats) * rows;
    const seatNumbers = Array.from({ length: totalSeats }, (_, i) => i + 1);

    this.leftSeatNumbers = Array.from({ length: rows }, () => []);
    this.rightSeatNumbers = Array.from({ length: rows }, () => []);

    let seatIndex = 0;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < leftSeats; col += 1) {
        if (seatIndex < seatNumbers.length) {
          this.leftSeatNumbers[row].push(seatNumbers[(seatIndex += 1)]);
        }
      }

      for (let col = 0; col < rightSeats; col += 1) {
        if (seatIndex < seatNumbers.length) {
          this.rightSeatNumbers[row].push(seatNumbers[(seatIndex += 1)]);
        }
      }
    }

    this.leftSeatNumbers = this.leftSeatNumbers.map((row) => row.reverse());
    this.rightSeatNumbers = this.rightSeatNumbers.map((row) => row.reverse());
  }

  selectSeat(seat: number): void {
    this.store.dispatch(
      selectSeat({ carriageIndex: this.carriageIndex + 1, seatNumber: seat }),
    );
  }
}
