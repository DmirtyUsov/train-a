import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { stationsReducer } from './store/reducers/stations.reducer';
import { StationsEffects } from './store/effects/stations.effects';
import { searchReducer } from './store/reducers/search.reducer';
import { searchResultReducer } from './store/reducers/search-result.reducer';
import { SearchResultEffects } from './store/effects/search-result.effects';

export const appStoreProviders = [
  provideStore({
    stations: stationsReducer,
    search: searchReducer,
    searchResult: searchResultReducer,
  }),
  provideEffects([StationsEffects, SearchResultEffects]),
];
