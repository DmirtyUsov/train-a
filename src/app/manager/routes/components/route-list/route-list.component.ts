import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';

import { CommonModule } from '@angular/common';

import { DataViewModule } from 'primeng/dataview';
import { RouteItemComponent } from '../route-item/route-item.component';
import { Route } from '../../../../models/route.model';
import {
  selectAllRoutes,
  selectRouteLoading,
} from '../../../../store/selectors/route.selectors';
import { loadRoutes } from '../../../../store/actions/route.actions';
import { selectAllStations } from '../../../../store/selectors/stations.selectors';
import { Station } from '../../../../models/station.models';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [DataViewModule, CommonModule, RouteItemComponent],
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
})
export class RouteListComponent implements OnInit {
  routes$: Observable<Route[]>;

  loading$: Observable<boolean>;

  routesWithCities$: Observable<{ route: Route; cities: string[] }[]>;

  constructor(private store: Store) {
    this.routes$ = this.store.select(selectAllRoutes);
    this.loading$ = this.store.select(selectRouteLoading);

    this.routesWithCities$ = combineLatest([
      this.store.select(selectAllRoutes),
      this.store.select(selectAllStations),
    ]).pipe(
      map(([routes, stations]) =>
        routes.map((route) => ({
          route,
          cities: route.path.map((stationId: number) => {
            const station = stations.find(
              (station: Station) => station.id === stationId,
            );
            return station ? station.city : 'loading city...';
          }),
        })),
      ),
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadRoutes());
    this.routes$.subscribe({
      next: (routes) => {
        console.log('Routes:', routes);
      },
      error: (error) => {
        console.error('Error fetching routes:', error);
      },
    });
  }
}
