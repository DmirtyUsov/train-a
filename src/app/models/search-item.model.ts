import { Route, Schedule } from './route.model';
import { SearchResponseStation } from './station.models';

export interface SearchItem {
  route: Route;
  schedule: Schedule;
  rideId: number;
  fromStation: SearchResponseStation;
  toStation: SearchResponseStation;
  deparchureTime: Date;
  arrivalTime: Date;
  carriages: Carriage[];
}

export interface Carriage {
  type: string;
  price: number;
}
