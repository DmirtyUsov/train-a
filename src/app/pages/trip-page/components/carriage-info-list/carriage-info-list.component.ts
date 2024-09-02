import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { Ride } from '../../../../models/ride.model';
import { CarriageService } from '../../../../services/carriage.service';
import { CarriageClassPipe } from '../../../../pipes/carriage-class.pipe';
import { CarriageTab } from '../../../../models/tab.model';
import { TripService } from '../../../../services/trip.service';
import { Observable } from 'rxjs';
import { SearchItem } from '../../../../models/search-item.model';
import { selectSelectedItem } from '../../../../store/selectors/search-result.selectors';
import { Store } from '@ngrx/store';
import { CarriageSchemeComponent } from '../carriage-scheme/carriage-scheme.component';
import { CarriageType } from '../../../../models/carriage.model';

@Component({
  selector: 'app-carriage-info-list',
  standalone: true,
  imports: [CommonModule, TabViewModule, CarriageSchemeComponent],
  templateUrl: './carriage-info-list.component.html',
  styleUrls: ['./carriage-info-list.component.scss'],
})
export class CarriageInfoListComponent implements OnInit {
  @Input() ride!: Ride;

  selectedItem$: Observable<SearchItem | null> =
    this.store.select(selectSelectedItem);
  tabs: CarriageTab[] = [];
  carriageTypes: CarriageType[] = [];

  private carriageClassPipe = new CarriageClassPipe();

  constructor(
    private store: Store,
    private carriageService: CarriageService,
    private tripService: TripService,
  ) {}

  ngOnInit(): void {
    this.carriageService.getCarriageTypes().subscribe((carriageTypes) => {
      this.carriageTypes = carriageTypes;

      this.selectedItem$.subscribe((item) => {
        if (item && item.route && item.route.path) {
          const routePath = item.route.path;
          const fromStationId = item.fromStation.stationId;
          const toStationId = item.toStation.stationId;

          const [startSegmentIndex, endSegmentIndex] =
            this.tripService.findStationIndices(
              fromStationId,
              toStationId,
              routePath,
            );

          const prices = this.tripService.calculateCarriagePrices(
            this.ride.schedule.segments,
            startSegmentIndex,
            endSegmentIndex,
          );

          this.tabs = this.tripService.groupCarriagesByType(
            this.ride.carriages,
            prices,
            this.carriageClassPipe,
          );

          // Precompute carriageInfo for each carriage
          this.tabs.forEach((tab) => {
            tab.carriages.forEach((carriage) => {
              carriage.carriageInfo = this.getCarriageType(carriage.type);
            });
          });
        }
      });
    });
  }

  getCarriageType(carriageCode: string): CarriageType | undefined {
    return this.carriageTypes.find((type) => type.code === carriageCode);
  }
}
