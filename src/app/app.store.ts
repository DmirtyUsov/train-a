import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { stationsReducer } from './store/reducers/stations.reducer';
import { StationsEffects } from './store/effects/stations.effects';
import { searchReducer } from './store/reducers/search.reducer';
import { searchResultReducer } from './store/reducers/search-result.reducer';
import { SearchResultEffects } from './store/effects/search-result.effects';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer } from './store/reducers/auth.reducer';
import { RideEffects } from './store/effects/ride.effects';
import { rideReducer } from './store/reducers/ride.reducer';
import { orderReducer } from './store/reducers/order.reducer';
import { OrderEffects } from './store/effects/order.effects';
import { RouteEffects } from './store/effects/route.effects';
import { routeReducer } from './store/reducers/route.reducer';

export const appStoreProviders = [
  provideStore({
    stations: stationsReducer,
    search: searchReducer,
    searchResult: searchResultReducer,
    auth: authReducer,
    ride: rideReducer,
    order: orderReducer,
    route: routeReducer,
  }),
  provideEffects([
    StationsEffects,
    SearchResultEffects,
    AuthEffects,
    RideEffects,
    OrderEffects,
    RouteEffects,
  ]),
];
