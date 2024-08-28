import { createAction, props } from '@ngrx/store';
import { ResponseError } from '../../models/error.model';
import { UserProfile } from '../../models/user.models';

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

export const signUp = createAction(
  `${AUTH} SignUp`,
  props<{ email: string; password: string }>(),
);
export const signUpSuccess = createAction(`${AUTH} SignUp ${SUCCESS}`);

export const signUpFailure = createAction(
  `${AUTH} SignUp ${FAILURE}`,
  props<{ error: ResponseError }>(),
);

export const signOut = createAction(`${AUTH} SignOut`);
export const signOutSuccess = createAction(`${AUTH} SignOut ${SUCCESS}`);

export const signOutFailure = createAction(
  `${AUTH} SignOut ${FAILURE}`,
  props<{ error: ResponseError }>(),
);

export const getUserProfile = createAction(`${AUTH} Get User Profile`);
export const getUserProfileSuccess = createAction(
  `${AUTH} Get User Profile ${SUCCESS}`,
  props<{ profile: UserProfile }>(),
);
export const getUserProfileFailure = createAction(
  `${AUTH} Get User Profile ${FAILURE}`,
  props<{ error: ResponseError }>(),
);
