import { Component } from '@angular/core';
import { RouteListComponent } from './components/route-list/route-list.component';

@Component({
  selector: 'app-routes',
  standalone: true,
  imports: [RouteListComponent],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent {}
