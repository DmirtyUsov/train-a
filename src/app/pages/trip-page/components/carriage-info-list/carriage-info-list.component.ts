import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewChangeEvent, TabViewModule } from 'primeng/tabview';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ride } from '../../../../models/ride.model';
import { CarriageService } from '../../../../services/carriage.service';
import { CarriageClassPipe } from '../../../../pipes/carriage-class.pipe';
import { CarriageTab } from '../../../../models/tab.model';
import { TripService } from '../../../../services/trip.service';
import { SearchItem } from '../../../../models/search-item.model';
import { selectSelectedItem } from '../../../../store/selectors/search-result.selectors';
import { CarriageSchemeComponent } from '../carriage-scheme/carriage-scheme.component';
import { CarriageType } from '../../../../models/carriage.model';
import { CarriageLegendComponent } from '../carriage-legend/carriage-legend.component';
import { updateRidePrice } from '../../../../store/actions/ride.actions';

@Component({
  selector: 'app-carriage-info-list',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    CarriageSchemeComponent,
    CarriageLegendComponent,
  ],
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

          // Dispatch price for the initially selected tab
          if (this.tabs.length > 0) {
            const defaultTabIndex = 0; // Assuming the first tab is the default
            const selectedPrice = this.tabs[defaultTabIndex].price;
            this.store.dispatch(updateRidePrice({ price: selectedPrice }));
          }
        }
      });
    });
  }

  getCarriageType(carriageCode: string): CarriageType | undefined {
    return this.carriageTypes.find((type) => type.code === carriageCode);
  }

  onTabChange(event: TabViewChangeEvent) {
    const selectedPrice = this.tabs[event.index].price;
    this.store.dispatch(updateRidePrice({ price: selectedPrice }));
  }
}
