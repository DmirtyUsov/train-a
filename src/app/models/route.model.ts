import { ScheduleSegment } from './order.model';

export interface Route {
  id: number;
  path: number[];
  carriages: string[];
  schedule: Schedule[];
}

export interface Schedule {
  rideId: number;
  segments: ScheduleSegment[];
  occupiedSeats: number[];
}
