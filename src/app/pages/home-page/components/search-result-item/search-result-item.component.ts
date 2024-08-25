import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '../../../../models/route.model';

@Component({
  selector: 'app-search-result-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
})
export class SearchResultItemComponent {
  @Input() item!: Route;
  @Input() fromCity!: string;
  @Input() toCity!: string;
  @Input() first!: boolean;
}
