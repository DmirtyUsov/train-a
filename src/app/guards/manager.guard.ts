import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthSelectors } from '../store';

export const managerGuard: CanMatchFn = (): Observable<boolean> => {
  return inject(Store).select(AuthSelectors.selectIsManager);
};
