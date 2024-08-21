import { Route } from '@angular/router';
import { Station } from './station.models';

export interface SearchResponse {
  from: Station;
  to: Station;
  routes: Route[];
}

