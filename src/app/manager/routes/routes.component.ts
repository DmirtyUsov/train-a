import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { RouteListComponent } from './components/route-list/route-list.component';
import { loadStations } from '../../store/actions/stations.actions';
import { CreateRouteFormComponent } from './components/create-route-form/create-route-form.component';
import { selectIsCreateFormVisible } from '../../store/selectors/route.selectors';
import { showCreateForm } from '../../store/actions/route.actions';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [
    RouteListComponent,
    ButtonModule,
    CreateRouteFormComponent,
    CommonModule,
  ],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent implements OnInit {
  isCreateFormVisible$ = this.store.select(selectIsCreateFormVisible);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadStations());
  }

  showCreateForm(): void {
    this.store.dispatch(showCreateForm());
  }
}
