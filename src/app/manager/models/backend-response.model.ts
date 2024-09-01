import { HttpStatusCode } from '@angular/common/http';
import { ResponseError } from '../../models/error.model';

export type BackendResponse<T> = {
  payload: T;
  code: HttpStatusCode;
  error: ResponseError | null;
};
