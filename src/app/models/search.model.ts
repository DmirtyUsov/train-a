import { Route } from './route.model';
import { Station } from './station.models';

export interface SearchResponse {
  from: Station;
  to: Station;
  routes: Route[];
}
