import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-not-authorized',
  standalone: true,
  imports: [],
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.scss',
})
export class NotAuthorizedComponent {
  constructor(private location: Location) {}

  navigateBack(): void {
    this.location.back();
  }
}
