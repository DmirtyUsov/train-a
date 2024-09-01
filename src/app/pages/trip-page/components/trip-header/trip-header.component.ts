import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-header',
  standalone: true,
  imports: [],
  templateUrl: './trip-header.component.html',
  styleUrl: './trip-header.component.scss',
})
export class TripHeaderComponent {
  rideId!: number;
  fromStationId!: string;
  toStationId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.rideId = +params['rideId'];
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.fromStationId = queryParams['from'];
      this.toStationId = queryParams['to'];
    });
  }
}
