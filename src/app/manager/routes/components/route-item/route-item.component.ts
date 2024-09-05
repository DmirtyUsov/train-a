import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '../../../../models/route.model';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { CarriageClassPipe } from '../../../../pipes/carriage-class.pipe';
import { ChipModule } from 'primeng/chip';

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
