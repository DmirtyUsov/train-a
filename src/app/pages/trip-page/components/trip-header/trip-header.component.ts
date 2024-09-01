import { Component, Input } from '@angular/core';
import { Ride } from '../../../../models/ride.model';
import { DatePipe } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-header',
  standalone: true,
  imports: [DatePipe, PanelModule, ButtonModule],
  templateUrl: './trip-header.component.html',
  styleUrls: ['./trip-header.component.scss'],
})
export class TripHeaderComponent {
  @Input() ride!: Ride;

  constructor(private router: Router) {}

  navigateBack() {
    this.router.navigate(['']);
  }
}
