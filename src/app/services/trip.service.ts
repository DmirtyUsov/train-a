// import { Injectable } from '@angular/core';
// import { CarriageClassPipe } from '../pipes/carriage-class.pipe';
// import { ScheduleSegment } from '../models/order.model';
// import {
//   groupCarriagesByType,
//   calculateCarriagePrices,
//   findStationIndices,
// } from '../helpers/trip.helpers';
// import { CarriageTab } from '../models/tab.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class TripService {
//   constructor(private carriageClassPipe: CarriageClassPipe) {}

//   groupCarriagesByType(
//     carriagesList: string[],
//     prices: Map<string, number>,
//   ): CarriageTab[] {
//     return groupCarriagesByType(carriagesList, prices, this.carriageClassPipe);
//   }

//   calculateCarriagePrices(
//     segments: ScheduleSegment[],
//     start: number,
//     end: number,
//   ): Map<string, number> {
//     return calculateCarriagePrices(segments, start, end);
//   }

//   findStationIndices(
//     fromStationId: number,
//     toStationId: number,
//     routePath: number[],
//   ): number[] {
//     return findStationIndices(fromStationId, toStationId, routePath);
//   }
// }
