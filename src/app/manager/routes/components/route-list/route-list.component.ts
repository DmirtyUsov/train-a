import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private store: Store) {
    this.routes$ = this.store.select(selectAllRoutes);
    this.loading$ = this.store.select(selectRouteLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadRoutes());
  }
}
