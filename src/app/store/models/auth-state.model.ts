import { ResponseError } from '../../models/error.model';

export type AuthState = {
  isAuthenticated: boolean;
  isManager: boolean;
  isLoading: boolean;
  token: string | null;
  error: ResponseError | null;
};
