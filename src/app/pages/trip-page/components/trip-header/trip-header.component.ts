import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SearchItem } from '../../../../models/search-item.model';
import { Store } from '@ngrx/store';
import { selectSelectedItem } from '../../../../store/selectors/search-result.selectors';
import { RouteDialogComponent } from '../../../home-page/components/route-dialog/route-dialog.component';
import { AsyncPipe } from '@angular/common';

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
