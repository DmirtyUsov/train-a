import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../models/station.models';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private apiUrl = '/api/station';

  stations = signal<Station[] | null>(null);

  constructor(private http: HttpClient) {
    effect(() => {
      const allStations = this.stations();
      if (allStations) {
        console.log('Stations:', allStations);
      }
    });
  }

  getAllStations(): void {
    this.http.get<Station[]>(this.apiUrl).subscribe({
      next: (response: Station[]) => {
        this.stations.set(response);
      },
      error: (error) => {
        console.error('Error fetching stations:', error);
      },
    });
  }
}
