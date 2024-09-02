import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { CarriageType } from '../../../../models/carriage.model';

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

  ngOnInit(): void {
    if (this.carriageInfo) {
      console.log('carriageInfo', this.carriageInfo);
      this.generateSeatNumbers();
    }
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

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < leftSeats; col++) {
        if (seatIndex < seatNumbers.length) {
          this.leftSeatNumbers[row].push(seatNumbers[seatIndex++]);
        }
      }

      for (let col = 0; col < rightSeats; col++) {
        if (seatIndex < seatNumbers.length) {
          this.rightSeatNumbers[row].push(seatNumbers[seatIndex++]);
        }
      }
    }

    this.leftSeatNumbers = this.leftSeatNumbers.map((row) => row.reverse());
    this.rightSeatNumbers = this.rightSeatNumbers.map((row) => row.reverse());
  }
}
