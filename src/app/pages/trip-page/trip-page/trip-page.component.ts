import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ride } from '../../../models/ride.model';
import {
  selectRide,
  selectRideError,
  selectRideLoading,
  selectSelectedCarriage,
  selectSelectedSeat,
} from '../../../store/selectors/ride.selectors';
import { loadRide } from '../../../store/actions/ride.actions';
import { ResponseError } from '../../../models/error.model';
import { TripHeaderComponent } from '../components/trip-header/trip-header.component';
import { CarriageInfoListComponent } from '../components/carriage-info-list/carriage-info-list.component';
import { BookSeatComponent } from '../components/book-seat/book-seat.component';

@Component({
  selector: 'app-trip-page',
  standalone: true,
  imports: [
    CommonModule,
    TripHeaderComponent,
    CarriageInfoListComponent,
    BookSeatComponent,
  ],
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.scss'],
})
export class TripPageComponent implements OnInit {
  ride$: Observable<Ride | null>;

  loading$: Observable<boolean>;

  error$: Observable<ResponseError | null>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) {
    this.ride$ = this.store.select(selectRide);
    this.loading$ = this.store.select(selectRideLoading);
    this.error$ = this.store.select(selectRideError);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const rideId = +params['rideId'];
      this.store.dispatch(loadRide({ rideId }));
    });

    this.ride$.subscribe((ride) => {
      console.log('Selected ride:', ride);
    });
  }
}
