import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouteListComponent } from './components/route-list/route-list.component';
import { loadStations } from '../../store/actions/stations.actions';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [RouteListComponent],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadStations());
  }
}
