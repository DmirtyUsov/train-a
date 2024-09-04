import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Seats } from '../../../models';

@Component({
  selector: 'app-seating-scheme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seating-scheme.component.html',
  styleUrl: './seating-scheme.component.scss',
})
export class SeatingSchemeComponent {
  @Input() seats!: Seats;
}
