import { createAction, props } from '@ngrx/store';
import { ResponseError } from '../../models/error.model';

const AUTH = '[Auth]';
const SUCCESS = 'Success';
const FAILURE = 'Failure';

export const signIn = createAction(
  `${AUTH} SignIn`,
  props<{ email: string; password: string }>(),
);
export const signInSuccess = createAction(
  `${AUTH} SignIn ${SUCCESS}`,
  props<{ token: string }>(),
);

export const signInFailure = createAction(
  `${AUTH} SignIn ${FAILURE}`,
  props<{ error: ResponseError }>(),
);

export const signOut = createAction(`${AUTH} SignOut`);
export const signOutSuccess = createAction(`${AUTH} SignOut ${SUCCESS}`);

export const signOutFailure = createAction(
  `${AUTH} SignOut ${FAILURE}`,
  props<{ error: ResponseError }>(),
);
