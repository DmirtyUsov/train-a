import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { CarriageType } from '../../../../models/carriage.model';
import { Store } from '@ngrx/store';
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

  selectedSeat: number | null = null;

  selectedCarriage: number | null = null;

  constructor(private store: Store) {}

  ngOnInit(): void {
    if (this.carriageInfo) {
      this.generateSeatNumbers();
    }

    this.store.select(selectSelectedSeat).subscribe((seat) => {
      this.selectedSeat = seat;
    });

    this.store.select(selectSelectedCarriage).subscribe((carriage) => {
      this.selectedCarriage = carriage;
    });
  }

  generateSeatNumbers(): void {
    if (!this.carriageInfo) return;

    const leftSeats = this.carriageInfo.leftSeats;
    const rightSeats = this.carriageInfo.rightSeats;
    const rows = this.carriageInfo.rows;

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

      for (let col = 0; col < rightSeats; col++) {
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
    console.log(`Selected seat: Car ${this.carriageIndex + 1}, Seat ${seat}`);
  }
}
