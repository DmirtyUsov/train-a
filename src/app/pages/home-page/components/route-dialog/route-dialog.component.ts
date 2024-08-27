import { Component, Input, OnInit } from '@angular/core';
import { Route, Schedule } from '../../../../models/route.model';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Observable, map } from 'rxjs';
import { Station } from '../../../../models/station.models';
import { Store } from '@ngrx/store';
import { CommonModule, DatePipe } from '@angular/common';
import { selectAllStations } from '../../../../store/selectors/stations.selectors';
import { RouteDetails } from '../../../../models/route-details.model';
import { mapRouteToDetails } from '../../../../helpers/search-result.helpers';

@Component({
  selector: 'app-route-dialog',
  standalone: true,
  imports: [ButtonModule, DialogModule, TableModule, DatePipe, CommonModule],
  templateUrl: './route-dialog.component.html',
  styleUrls: ['./route-dialog.component.scss'],
})
export class RouteDialogComponent implements OnInit {
  @Input() route!: Route;
  @Input() schedule!: Schedule;
  routeDetails!: RouteDetails;

  allStations$: Observable<Station[]>;

  constructor(private store: Store) {
    this.allStations$ = this.store.select(selectAllStations);
  }

  isDialogVisible = false;

  ngOnInit(): void {
    this.allStations$
      .pipe(
        map((stations) =>
          mapRouteToDetails(this.route, this.schedule, stations),
        ),
      )
      .subscribe((details) => {
        this.routeDetails = details;
      });
  }

  onRouteButtonClick() {
    this.isDialogVisible = !this.isDialogVisible;
  }
}
