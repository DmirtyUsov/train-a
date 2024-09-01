import { Component } from '@angular/core';
import { TripHeaderComponent } from '../components/trip-header/trip-header.component';

@Component({
  selector: 'app-trip-page',
  standalone: true,
  imports: [TripHeaderComponent],
  templateUrl: './trip-page.component.html',
  styleUrl: './trip-page.component.scss',
})
export class TripPageComponent {}
