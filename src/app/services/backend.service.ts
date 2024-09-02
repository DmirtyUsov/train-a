import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { SignInResponse } from '../models/signin-response.model';
import { UserProfile } from '../models/user.models';
import { Station } from '../models/station.models';
import { BackendResponse, NewStation, ObjectWithId } from '../manager/models';
import { ResponseError } from '../models/error.model';

enum Endpoints {
  'Station' = 'station',
}
const URL = '/api/';
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  static makeUrl(endpoint: string): string {
    return `${URL}${endpoint}`;
  }

  logGETResponse(endpoint: string) {
    const url = BackendService.makeUrl(endpoint);
    return this.http.get(url).subscribe((response) => console.log(response));
  }

  signIn(email: string, password: string): Observable<SignInResponse> {
    const url = BackendService.makeUrl('signin');
    const body = { email, password };
    return this.http.post<SignInResponse>(url, body);
  }

  signUp(email: string, password: string): Observable<null> {
    const url = BackendService.makeUrl('signup');
    const body = { email, password };
    return this.http.post<null>(url, body);
  }

  signOut() {
    const url = BackendService.makeUrl('logout');
    return this.http.delete(url);
  }

  getProfile(): Observable<UserProfile> {
    const url = BackendService.makeUrl('profile');
    return this.http.get<UserProfile>(url);
  }

  getStations(): Observable<BackendResponse<Station[] | null>> {
    const url = BackendService.makeUrl(Endpoints.Station);
    return this.http.get<Station[]>(url).pipe(
      map((payload) => ({ payload, code: HttpStatusCode.Ok, error: null })),
      catchError(BackendService.handleError),
    );
  }

  deleteStation(id: number): Observable<BackendResponse<number | null>> {
    const url = `${BackendService.makeUrl(Endpoints.Station)}/${id}`;
    return this.http.delete<void>(url).pipe(
      map(() => ({
        payload: null,
        code: HttpStatusCode.Ok,
        error: null,
      })),
      catchError(BackendService.handleError),
    );
  }

  addStation(
    newStation: NewStation,
  ): Observable<BackendResponse<number | null>> {
    const url = BackendService.makeUrl(Endpoints.Station);
    return this.http.post<ObjectWithId<number>>(url, newStation).pipe(
      map(({ id }) => ({ payload: id, code: HttpStatusCode.Ok, error: null })),
      catchError(BackendService.handleError),
    );
  }

  static handleError(
    error: HttpErrorResponse,
  ): Observable<BackendResponse<null>> {
    const errorFoResponse: ResponseError = { message: '', reason: '' };
    const response: BackendResponse<null> = {
      payload: null,
      code: HttpStatusCode.InternalServerError,
      error: errorFoResponse,
    };
    if (error.error instanceof Error) {
      // A client-side or network error occurred.
      errorFoResponse.message = error.message;
      errorFoResponse.reason = 'A client-side or network error occurred';
    } else {
      // The backend returned an unsuccessful response code.
      errorFoResponse.message = error.error.message;
      errorFoResponse.reason = error.error.reason;
      response.code = error.status;
    }
    return of(response);
  }
}
