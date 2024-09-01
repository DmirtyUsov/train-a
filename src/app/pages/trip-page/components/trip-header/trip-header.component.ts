import { Component, Input } from '@angular/core';
import { Ride } from '../../../../models/ride.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-header',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './trip-header.component.html',
  styleUrls: ['./trip-header.component.scss'],
})
export class TripHeaderComponent {
  @Input() ride!: Ride;
}
