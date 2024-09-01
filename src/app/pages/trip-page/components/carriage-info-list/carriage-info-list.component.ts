import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { Ride } from '../../../../models/ride.model';
import { CarriageService } from '../../../../services/carriage.service';
import { CarriageClassPipe } from '../../../../pipes/carriage-class.pipe';
import { CarriageTab } from '../../../../models/tab.model';
import { TripService } from '../../../../services/trip.service';

@Component({
  selector: 'app-carriage-info-list',
  standalone: true,
  imports: [CommonModule, TabViewModule],
  templateUrl: './carriage-info-list.component.html',
  styleUrls: ['./carriage-info-list.component.scss'],
})
export class CarriageInfoListComponent implements OnInit {
  @Input() ride!: Ride;

  tabs: CarriageTab[] = [];

  private carriageClassPipe = new CarriageClassPipe();

  constructor(
    private carriageService: CarriageService,
    private tripService: TripService,
  ) {}

  ngOnInit(): void {
    const startSegmentIndex = 3; // Example start index
    const endSegmentIndex = 6; // Example end index
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

    this.carriageService.getCarriageTypes().subscribe((carriageTypes) => {
      console.log('Carriage Types:', carriageTypes);
    });
  }
}
