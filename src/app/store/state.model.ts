import { AuthState } from './models/auth-state.model';
import { OrderState } from './reducers/order.reducer';
import { RideState } from './reducers/ride.reducer';
import { SearchResultState } from './reducers/search-result.reducer';
import { SearchState } from './reducers/search.reducer';
import { StationsState } from './reducers/stations.reducer';

export interface AppState {
  stations: StationsState;
  search: SearchState;
  searchResult: SearchResultState;
  auth: AuthState;
  ride: RideState;
  order: OrderState;
}
