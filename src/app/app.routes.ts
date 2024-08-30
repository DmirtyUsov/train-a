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
  },
  {
    path: 'signup',
    component: SignupPageComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'admin',
    component: BackendTestComponent,
    canMatch: [managerGuard],
    children: [
      {
        path: 'stations',
        component: BackendTestComponent,
      },
      {
        path: 'routes',
        component: BackendTestComponent,
      },
      {
        path: 'carriages',
        component: BackendTestComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: NotAuthorizedComponent,
    children: [{ path: '**', component: NotAuthorizedComponent }],
  },
  { path: '**', component: NotFoundComponent },
];
