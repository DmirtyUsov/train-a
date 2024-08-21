import { Routes } from '@angular/router';
import { BackendTestComponent } from './components/backend-test/backend-test.component';
import { AuthTestComponent } from './components/auth-test/auth-test.component';

export const routes: Routes = [
  {
    path: '',
    component: BackendTestComponent,
  },
  {
    path: 'auth',
    component: AuthTestComponent,
  },
];
