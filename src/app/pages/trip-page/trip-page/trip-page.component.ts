import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripHeaderComponent } from '../components/trip-header/trip-header.component';
import { Observable } from 'rxjs';
import { Ride } from '../../../models/ride.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import {
  selectRide,
  selectRideError,
  selectRideLoading,
} from '../../../store/selectors/ride.selectors';
import { loadRide } from '../../../store/actions/ride.actions';

@Component({
  selector: 'app-trip-page',
  standalone: true,
  imports: [CommonModule, TripHeaderComponent],
  templateUrl: './trip-page.component.html',
  styleUrl: './trip-page.component.scss',
})
export class TripPageComponent implements OnInit {
  ride$: Observable<Ride | null>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

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
  }
}
