import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { TripPageComponent } from './pages/trip-page/trip-page/trip-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { guestGuard } from './guards/guest.guard';
import { managerGuard } from './guards/manager.guard';
import { userGuard } from './guards/user.guard';
import { OrderPageComponent } from './pages/order-page/order-page/order-page.component';
import { BackendTestComponent } from './components/backend-test/backend-test.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  { path: 'test', component: BackendTestComponent },
  {
    path: 'signin',
    component: SigninPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./manager/manager.routes').then((mod) => mod.MANAGER_ROUTES),
    canMatch: [managerGuard],
  },
  {
    path: 'admin',
    component: NotAuthorizedComponent,
    children: [{ path: '**', component: NotAuthorizedComponent }],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [userGuard],
  },
  {
    path: 'orders',
    component: OrderPageComponent,
    canActivate: [userGuard],
  },
  {
    path: 'trip/:rideId',
    component: TripPageComponent,
  },
  { path: '**', component: NotFoundComponent },
];
