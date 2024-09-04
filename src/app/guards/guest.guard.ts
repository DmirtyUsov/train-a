import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { AuthSelectors } from '../store';

export const guestGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  const isAuthenticated$ = store.select(AuthSelectors.selectIsAuthenticated);

  return isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        const urlTree = router.parseUrl('/');
        return new RedirectCommand(urlTree);
      }
      return true;
    }),
  );
};
