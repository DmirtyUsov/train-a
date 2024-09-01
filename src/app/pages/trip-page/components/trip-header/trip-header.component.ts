import { Component } from '@angular/core';
import { CommonModule, DatePipe, AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchItem } from '../../../../models/search-item.model';
import { selectSelectedItem } from '../../../../store/selectors/search-result.selectors';
import { RouteDialogComponent } from '../../../home-page/components/route-dialog/route-dialog.component';

@Component({
  selector: 'app-trip-header',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    CommonModule,
    PanelModule,
    ButtonModule,
    RouteDialogComponent,
  ],
  templateUrl: './trip-header.component.html',
  styleUrls: ['./trip-header.component.scss'],
})
export class TripHeaderComponent {
  selectedItem$: Observable<SearchItem | null> =
    this.store.select(selectSelectedItem);

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  navigateBack() {
    this.router.navigate(['']);
  }
}
