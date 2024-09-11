import { HttpErrorResponse } from '@angular/common/http';
import { ResponseError } from '../models/error.model';

export function formatError(error: HttpErrorResponse): ResponseError {
  return (
    error.error || { message: 'An error occurred', reason: 'unknown_error' }
  );
}
