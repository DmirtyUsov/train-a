import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'signin',
    component: SigninPageComponent,
  },
];
