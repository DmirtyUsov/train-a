import { Component, OnInit } from '@angular/core';
import { OrderListComponent } from '../components/order-list/order-list.component';
import { Store } from '@ngrx/store';
import { loadStations } from '../../../store/actions/stations.actions';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [OrderListComponent],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
})
export class OrderPageComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadStations());
  }
}
