import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { hideCreateForm } from '../../../../store/actions/route.actions';

@Component({
  selector: 'app-create-route-form',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './create-route-form.component.html',
  styleUrl: './create-route-form.component.scss',
})
export class CreateRouteFormComponent {
  constructor(private store: Store) {}

  hideCreateForm(): void {
    this.store.dispatch(hideCreateForm());
  }
}
