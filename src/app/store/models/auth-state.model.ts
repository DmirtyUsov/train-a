import { ResponseError } from '../../models/error.model';
import { UserProfile } from '../../models/user.models';

export type AuthState = {
  isAuthenticated: boolean;
  isManager: boolean;
  isLoading: boolean;
  profile: UserProfile | null;
  token: string | null;
  error: ResponseError | null;
};
