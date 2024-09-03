import { Component } from '@angular/core';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Store } from '@ngrx/store';

import { BackendService } from '../../services/backend.service';
import { ToastService } from '../../services/toast.service';

import { AuthActions } from '../../store';

@Component({
  selector: 'app-backend-test',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    FieldsetModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
  ],
  templateUrl: './backend-test.component.html',
  styleUrl: './backend-test.component.scss',
})
export class BackendTestComponent {
  constructor(
    private backendService: BackendService,
    private toastService: ToastService,
    private store: Store,
  ) {}

  onGet(endpoint: string) {
    this.toastService.warn(`Test Removed ${endpoint}`);
  }

  showSuccess() {
    this.toastService.success('Congratulations!');
  }

  showInfo() {
    this.toastService.info(
      'Please see attached document for your review and approval.',
    );
  }

  showWarn() {
    this.toastService.warn(
      'Hurricane conditions (sustained winds of 74 mph or greater) are expected somewhere within the specified area',
    );
  }

  showError() {
    this.toastService.error(' A deviation from accuracy or correctness!');
  }

  signIn() {
    this.store.dispatch(
      AuthActions.signIn({ email: 'admin@admin.com', password: 'my-password' }),
    );
  }

  signOut() {
    this.store.dispatch(AuthActions.signOut());
  }
}
