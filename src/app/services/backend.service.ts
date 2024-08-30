import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInResponse } from '../models/signin-response.model';
import { UserProfile } from '../models/user.models';
import { Station } from '../models/station.models';
import { NewStation } from '../manager/models';

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

  getStations(): Observable<Station[]> {
    const url = BackendService.makeUrl(Endpoints.Station);
    return this.http.get<Station[]>(url);
  }

  deleteStation(id: number) {
    const url = `${BackendService.makeUrl(Endpoints.Station)}/${id}`;
    return this.http.delete(url);
  }

  addStation(newStation: NewStation): Observable<number> {
    const url = BackendService.makeUrl(Endpoints.Station);
    return this.http.post<number>(url, newStation);
  }
}
