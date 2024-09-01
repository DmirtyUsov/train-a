import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { BackendTestComponent } from './components/backend-test/backend-test.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TripPageComponent } from './pages/trip-page/trip-page/trip-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

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
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },

  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./manager/manager.routes').then((mod) => mod.MANAGER_ROUTES),
  },
  {
    path: 'trip/:rideId',
    component: TripPageComponent,
  },
  { path: '**', component: NotFoundComponent },
];
