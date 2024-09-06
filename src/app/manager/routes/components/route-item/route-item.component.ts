import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { CarriageClassPipe } from '../../../../pipes/carriage-class.pipe';
import { Route } from '../../../../models/route.model';
import {
  deleteRoute,
  setSelectedRoute,
} from '../../../../store/actions/route.actions';

@Component({
  selector: 'app-route-item',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    CardModule,
    CarriageClassPipe,
    ChipModule,
    ButtonModule,
  ],
  templateUrl: './route-item.component.html',
  styleUrls: ['./route-item.component.scss'],
})
export class RouteItemComponent {
  @Input() route!: Route;

  @Input() cities!: string[];

  constructor(private store: Store) {}

  deleteButtonClicked(): void {
    if (this.route && this.route.id) {
      this.store.dispatch(deleteRoute({ routeId: this.route.id }));
    }
  }

  onUpdateButtonClick(): void {
    // Store the selected route
    this.store.dispatch(setSelectedRoute({ route: this.route }));
  }
}
