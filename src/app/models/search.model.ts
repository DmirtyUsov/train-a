import { Route } from '@angular/router';
import { Station } from './station.models';

export interface SearchResponse {
  from: Station;
  to: Station;
  routes: Route[];
}

export const mockRequest = {
  fromLatitude: 63.86940865129512,
  fromLongitude: -33.027608625418196,
  toLatitude: 65.9584179775944,
  toLongitude: -175.92295195193486,
  time: 1723669200000,
};
