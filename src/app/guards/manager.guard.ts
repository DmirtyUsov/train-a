import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../store';

export const managerGuard: CanMatchFn = () => {
  const store = inject(Store);

  const isManager$ = store.select(AuthSelectors.selectIsManager);

  return isManager$;
};
