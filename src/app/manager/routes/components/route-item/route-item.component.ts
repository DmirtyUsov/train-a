import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '../../../../models/route.model';

@Component({
  selector: 'app-route-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './route-item.component.html',
  styleUrl: './route-item.component.scss',
})
export class RouteItemComponent {
  @Input()
  route!: Route;
}
