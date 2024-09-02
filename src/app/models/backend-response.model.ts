import { HttpStatusCode } from '@angular/common/http';
import { ResponseError } from './error.model';

export type BackendResponse<T> = {
  payload: T;
  code: HttpStatusCode;
  error: ResponseError | null;
};
