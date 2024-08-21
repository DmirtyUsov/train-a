import { SearchState } from './reducers/search.reducer';
import { StationsState } from './reducers/stations.reducer';

export interface AppState {
  stations: StationsState;
  search: SearchState;
}
