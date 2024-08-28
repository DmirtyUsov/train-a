import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, take } from 'rxjs';

import { AuthSelectors } from '../store';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const state = inject(Store).select(AuthSelectors.selectToken);
  return state.pipe(
    take(1),
    mergeMap((token) => {
      const modifiedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next(modifiedReq);
    }),
  );
};
