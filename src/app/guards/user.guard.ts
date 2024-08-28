import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../store';

export const userGuard: CanActivateFn = () => {
  const store = inject(Store);

  const isAuthenticated$ = store.select(AuthSelectors.selectIsAuthenticated);

  return isAuthenticated$;
};
