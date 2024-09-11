import { Route } from '@angular/router';
import { StationsComponent } from './stations/stations.component';
import { CarriagesComponent } from './carriages/carriages.component';
import { RoutesComponent } from './routes/routes.component';

export const MANAGER_ROUTES: Route[] = [
  { path: 'stations', component: StationsComponent },
  { path: 'carriages', component: CarriagesComponent },
  { path: 'routes', component: RoutesComponent },
  {
    path: '',
    redirectTo: 'stations',
    pathMatch: 'full',
  },
];
