import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';

import { ManagerService } from '../manager.service';
import { CarriageType } from '../../models/carriage.model';
import { CarriageSchemeComponent } from '../../pages/trip-page/components/carriage-scheme/carriage-scheme.component';
import { SeatsGeneratorService } from '../../services/seats-generator.service';
import { SeatingSchemeComponent } from './components/seating-scheme/seating-scheme.component';

@Component({
  selector: 'app-carriages',
  standalone: true,
  imports: [
    AsyncPipe,
    ProgressSpinnerModule,
    CarriageSchemeComponent,
    JsonPipe,
    SeatingSchemeComponent,
    CardModule,
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent implements OnInit {
  isLoading$: Observable<boolean>;

  carriages$: Observable<CarriageType[]>;

  constructor(private manager: ManagerService) {
    this.isLoading$ = this.manager.isLoading$;
    this.carriages$ = this.manager.carriages$;
  }

  ngOnInit(): void {}

  getSeats(carriage: CarriageType) {
    return SeatsGeneratorService.get(carriage);
  }
}
