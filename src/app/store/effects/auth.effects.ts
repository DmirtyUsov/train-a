import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthActions } from '..';
import { BackendService } from '../../services/backend.service';
import { ResponseError } from '../../models/error.model';
import { ToastService } from '../../services/toast.service';
import { KeepAuthService } from '../../services/keep-auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private backend: BackendService,
    private toastService: ToastService,
    private keepAuth: KeepAuthService,
  ) {}

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ email, password }) =>
        this.backend.signIn(email, password).pipe(
          map((data) => AuthActions.signInSuccess(data)),
          tap(() => this.toastService.success('You are logged in!')),
          catchError((error) => {
            return of(AuthActions.signInFailure({ error: error.error }));
          }),
        ),
      ),
    );
  });

  saveTokenOnSignSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(({ token }) => this.keepAuth.save(token)),
      );
    },
    { dispatch: false },
  );

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      mergeMap(() =>
        this.backend.signOut().pipe(
          map(() => AuthActions.signOutSuccess()),
          tap(() => this.toastService.warn('You are logged out!')),
          catchError((error) => {
            this.toastService.error((error.error as ResponseError).message);
            return of(AuthActions.signOutFailure({ error: error.error }));
          }),
        ),
      ),
    );
  });

  removeTokenOnSignOutSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.signOutSuccess),
        tap(() => this.keepAuth.remove()),
      );
    },
    { dispatch: false },
  );
}
