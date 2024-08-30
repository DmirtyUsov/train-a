import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { BackendTestComponent } from './components/backend-test/backend-test.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { guestGuard } from './guards/guest.guard';
import { managerGuard } from './guards/manager.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'test',
    component: BackendTestComponent,
  },
  {
    path: 'signin',
    component: SigninPageComponent,
    canActivate: [guestGuard],
    redirectTo: '/',
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [guestGuard],
    redirectTo: '/',
  },
  {
    path: 'admin',
    component: NotAuthorizedComponent,
    canActivate: [managerGuard],
  },
  { path: '**', component: NotFoundComponent },
];
