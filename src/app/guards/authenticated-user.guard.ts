import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { AuthSelectors } from '../store';

export const authenticatedUserGuard: CanActivateFn = () => {
  const store = inject(Store);

  const isAuthenticated$ = store.select(AuthSelectors.selectIsAuthenticated);

  return isAuthenticated$.pipe(
    // To prevent access when authenticated, so we invert the logic
    map((isAuthenticated) => !isAuthenticated),
  );
};
