import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllOrders,
  selectOrderLoading,
} from '../../../../store/selectors/order.selectors';
import { loadOrders } from '../../../../store/actions/order.actions';
import { DataViewModule } from 'primeng/dataview';
import { OrderItemComponent } from '../order-item/order-item.component';
import { loadStations } from '../../../../store/actions/stations.actions';
import { findStationIndices } from '../../../../helpers/trip.helpers';
import { Order } from '../../../../models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [DataViewModule, CommonModule, OrderItemComponent],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;

  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.orders$ = this.store.select(selectAllOrders).pipe(
      map((orders: Order[]) => {
        return [...orders].sort((a, b) => {
          const departureTimeA = this.getDepartureTime(a);
          const departureTimeB = this.getDepartureTime(b);
          return departureTimeA.getTime() - departureTimeB.getTime();
        });
      }),
    );

    this.loading$ = this.store.select(selectOrderLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadStations());
    this.store.dispatch(loadOrders({ all: true }));

    this.orders$.subscribe();
  }

  getDepartureTime(order: Order): Date {
    const [startSegmentIndex] = findStationIndices(
      order.stationStart,
      order.stationEnd,
      order.path,
    );
    return new Date(order.schedule.segments[startSegmentIndex].time[0]);
  }
}
