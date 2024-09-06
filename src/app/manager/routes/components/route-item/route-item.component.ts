import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { CarriageClassPipe } from '../../../../pipes/carriage-class.pipe';
import { Route } from '../../../../models/route.model';
import { Store } from '@ngrx/store';
import { deleteRoute } from '../../../../store/actions/route.actions';

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
      console.log('Delete Route Request:', { routeId: this.route.id });
      // Dispatch the delete action
      this.store.dispatch(deleteRoute({ routeId: this.route.id }));
    }
  }
}
