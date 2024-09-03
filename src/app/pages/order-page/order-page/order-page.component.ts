import { Component } from '@angular/core';
import { OrderListComponent } from '../components/order-list/order-list.component';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [OrderListComponent],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
})
export class OrderPageComponent {}
