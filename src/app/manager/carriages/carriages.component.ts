import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';

import { ManagerService } from '../manager.service';
import { CarriageType } from '../../models/carriage.model';
import { CarriageSchemeComponent } from '../../pages/trip-page/components/carriage-scheme/carriage-scheme.component';
import { SeatsGeneratorService } from '../../services/seats-generator.service';
import { SeatingSchemeComponent } from './components/seating-scheme/seating-scheme.component';
import { ToastService } from '../../services/toast.service';
import { Seats } from '../models';
import { EditCarriagePopupComponent } from './components/edit-carriage-popup/edit-carriage-popup.component';

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
    ConfirmPopupModule,
    ButtonModule,
    EditCarriagePopupComponent,
  ],
  templateUrl: './carriages.component.html',
  styleUrl: './carriages.component.scss',
})
export class CarriagesComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;

  carriages$: Observable<CarriageType[]>;

  private getSeatsFn = SeatsGeneratorService.get;

  private subscriptions: Subscription = new Subscription();

  displayCreatePopup: boolean = false;

  displayUpdatePopup: boolean = false;

  selectedCarriage: CarriageType = {
    name: '',
    rows: 0,
    code: '',
    leftSeats: 0,
    rightSeats: 0,
  };

  constructor(
    private manager: ManagerService,
    private confirmationService: ConfirmationService,
    private toast: ToastService,
  ) {
    this.isLoading$ = this.manager.isLoading$;
    this.carriages$ = this.manager.carriages$;
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.manager.afterDeleteCarriageAction$.subscribe((response) => {
        if (response.code === HttpStatusCode.Ok) {
          this.toast.success(`Carriage removed`);
          this.manager.refreshCarriages$.next(
            `after delete ${response.payload}`,
          );
        } else {
          this.toast.error(response.error!.message);
        }
      }),
    );

    this.subscriptions.add(
      this.manager.afterAddCarriageAction$.subscribe((response) => {
        if (response.code === HttpStatusCode.Ok) {
          this.toast.success(`Carriage added`);
          this.manager.refreshCarriages$.next(`after add ${response.payload}`);
          this.displayCreatePopup = false;
        } else {
          this.toast.error(response.error!.message);
        }
      }),
    );

    this.subscriptions.add(
      this.manager.afterUpdateCarriageAction$.subscribe((response) => {
        if (response.code === HttpStatusCode.Ok) {
          this.toast.success(`Carriage updated`);
          this.manager.refreshCarriages$.next(
            `after update ${response.payload}`,
          );
          this.displayCreatePopup = false;
        } else {
          this.toast.error(response.error!.message);
        }
      }),
    );
  }

  confirmDelete(event: Event, code: string) {
    this.confirmationService.confirm({
      key: `popupConfirmDelete-${code}`,
      target: event.target as EventTarget,
      message: 'Are you sure?',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.manager.deleteCarriageAction$.next(code);
      },
      reject: () => {},
    });
  }

  getSeats(carriage: CarriageType): Seats {
    return this.getSeatsFn(carriage);
  }

  toggleEditPopup(carriage: CarriageType) {
    this.selectedCarriage = carriage;
    this.displayUpdatePopup = true;
  }

  toggleCreatePopup() {
    this.displayCreatePopup = true;
  }

  onConfirmUpdate(carriage: CarriageType) {
    if (!this.selectedCarriage.code) {
      return;
    }
    this.manager.updateCarriageAction$.next(carriage);
  }

  onConfirmCreate(newCarriage: CarriageType) {
    this.manager.addCarriageAction$.next(newCarriage);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
