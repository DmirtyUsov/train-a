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
import {
  RouteDetails,
  RouteStop,
} from '../../../../models/route-details.model';

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
          this.mapRouteToDetails(this.route, this.schedule, stations),
        ),
      )
      .subscribe((details) => {
        this.routeDetails = details;
      });
  }

  onRouteButtonClick() {
    this.isDialogVisible = !this.isDialogVisible;
  }

  private mapRouteToDetails(
    route: Route,
    schedule: Schedule,
    stations: Station[],
  ): RouteDetails {
    const stops: RouteStop[] = route.path.map((stationId, index) => {
      const station = stations.find((s) => s.id === stationId);
      const stop: RouteStop = {
        stationCity: station?.city || 'Unknown',
      };

      if (index === 0) {
        stop.departureTime = new Date(schedule.segments[0].time[0]);
      } else if (index === route.path.length - 1) {
        stop.arrivalTime = new Date(
          schedule.segments[schedule.segments.length - 1].time[1],
        );
      } else {
        const previousSegment = schedule.segments[index - 1];
        const currentSegment = schedule.segments[index];
        stop.arrivalTime = new Date(previousSegment.time[1]);
        stop.departureTime = new Date(currentSegment.time[0]);
      }

      return stop;
    });

    return {
      routeId: route.id,
      stops,
    };
  }
}
