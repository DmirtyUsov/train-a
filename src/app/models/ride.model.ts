import { ScheduleSegment } from './order.model';

export interface Ride {
  rideId: number;
  path: number[];
  carriages: string[];
  schedule: {
    segments: ScheduleSegment[];
  };
  occupiedSeats: number[];
}
