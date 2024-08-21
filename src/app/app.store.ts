import { provideStore } from '@ngrx/store';
import { stationsReducer } from './store/reducers/stations.reducer';
import { provideEffects } from '@ngrx/effects';
import { StationsEffects } from './store/effects/stations.effects';

export const appStoreProviders = [
  provideStore({ stations: stationsReducer }),
  provideEffects([StationsEffects]),
];
