import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../../../models/order.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllOrders,
  selectOrderLoading,
} from '../../../../store/selectors/order.selectors';
import { loadOrders } from '../../../../store/actions/order.actions';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [DataViewModule, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.orders$ = this.store.select(selectAllOrders);
    this.loading$ = this.store.select(selectOrderLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(loadOrders({ all: true }));

    this.orders$.subscribe((orders) => {
      console.log('Orders:', orders);
    });
  }
}
