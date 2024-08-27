import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { TOAST_KEY } from '../../services/toast.service';
import { KeepAuthService } from '../../services/keep-auth.service';
import { AuthActions } from '../../store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    ToastModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly toastKey = TOAST_KEY;

  constructor(
    private keepAuth: KeepAuthService,
    private store: Store,
  ) {
    const token = this.keepAuth.restore();
    if (token) {
      store.dispatch(AuthActions.signInSuccess({ token }));
    }
  }
}
