import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  logGETResponse(endpoint: string) {
    const url = `/api/${endpoint}`;
    return this.http.get(url).subscribe((response) => console.log(response));
  }
}
