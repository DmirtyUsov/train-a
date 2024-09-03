import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../models/order.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllOrders } from '../../../../store/selectors/order.selectors';
import { loadOrders } from '../../../../store/actions/order.actions';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders$!: Observable<Order[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadOrders({ all: true }));

    this.orders$ = this.store.select(selectAllOrders);

    this.orders$.subscribe((orders) => {
      console.log('Orders:', orders);
    });
  }
}
