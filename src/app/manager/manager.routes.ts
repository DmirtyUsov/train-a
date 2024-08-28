import { Route } from '@angular/router';
import { StationsComponent } from './stations/stations.component';

export const MANAGER_ROUTES: Route[] = [
  { path: 'stations', component: StationsComponent },
  {
    path: '',
    redirectTo: 'stations',
    pathMatch: 'full',
  },
];
