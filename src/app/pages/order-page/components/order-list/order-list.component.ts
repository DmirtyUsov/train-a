import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DataViewModule } from 'primeng/dataview';
import {
  selectOrderLoading,
  selectSortedOrders,
} from '../../../../store/selectors/order.selectors';
import { OrderItemComponent } from '../order-item/order-item.component';
import { Order } from '../../../../models/order.model';
import { loadStations } from '../../../../store/actions/stations.actions';

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
    this.orders$ = this.store.select(selectSortedOrders);

    this.loading$ = this.store.select(selectOrderLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadStations());
  }
}
