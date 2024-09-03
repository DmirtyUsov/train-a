import { Injectable } from '@angular/core';
import { CarriageType } from '../models/carriage.model';

export type Seats = { leftSide: number[][]; rightSide: number[][] };
@Injectable({
  providedIn: 'root',
})
export class SeatsGeneratorService {
  static get(carriage: CarriageType): Seats {
    const {
      leftSeats: leftCols = 0,
      rightSeats: rightCols = 0,
      rows = 0,
    } = carriage;

    const totalSeats = (leftCols + rightCols) * rows;
    const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

    const leftSeats: number[][] = Array.from({ length: rows }, () => []);
    const rightSeats: number[][] = Array.from({ length: rows }, () => []);

    let seatIndex = 0;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < leftCols; col += 1) {
        if (seatIndex < seats.length) {
          leftSeats[row].push(seats[seatIndex]);
          seatIndex += 1;
        }
      }

      for (let col = 0; col < rightCols; col += 1) {
        if (seatIndex < seats.length) {
          rightSeats[row].push(seats[seatIndex]);
          seatIndex += 1;
        }
      }
    }

    const result: Seats = {
      leftSide: leftSeats.map((row) => row.reverse()),
      rightSide: rightSeats.map((row) => row.reverse()),
    };

    return result;
  }
}
