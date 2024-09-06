import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { RouteItemComponent } from '../route-item/route-item.component';
import { Route } from '../../../../models/route.model';
import {
  selectRouteLoading,
  selectRoutesWithCities,
} from '../../../../store/selectors/route.selectors';
import { loadRoutes } from '../../../../store/actions/route.actions';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [DataViewModule, CommonModule, RouteItemComponent, ButtonModule],
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
})
export class RouteListComponent implements OnInit {
  routesWithCities$: Observable<{ route: Route; cities: string[] }[]>;

  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.routesWithCities$ = this.store.select(selectRoutesWithCities);
    this.loading$ = this.store.select(selectRouteLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadRoutes());

    this.routesWithCities$.subscribe({
      next: (routesWithCities) => {
        console.log('Routes with Cities:', routesWithCities);
      },
      error: (error) => {
        console.error('Error fetching routes or stations:', error);
      },
    });
  }

  onRefreshButtonClick() {
    this.store.dispatch(loadRoutes());
  }
}
