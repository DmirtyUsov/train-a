import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../store';

export const managerGuard: CanActivateFn = () => {
  const store = inject(Store);

  const isManager$ = store.select(AuthSelectors.selectIsManager);

  return isManager$;
};
