import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { CarriageClassPipe } from '../../../../pipes/carriage-class.pipe';
import { Route } from '../../../../models/route.model';

@Component({
  selector: 'app-route-item',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    CardModule,
    CarriageClassPipe,
    ChipModule,
  ],
  templateUrl: './route-item.component.html',
  styleUrls: ['./route-item.component.scss'],
})
export class RouteItemComponent {
  @Input() route!: Route;

  @Input() cities!: string[];
}
