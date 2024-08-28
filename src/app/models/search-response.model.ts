import { Route } from './route.model';
import { SearchResponseStation } from './station.models';

export interface SearchResponse {
  from: SearchResponseStation;
  to: SearchResponseStation;
  routes: Route[];
}
