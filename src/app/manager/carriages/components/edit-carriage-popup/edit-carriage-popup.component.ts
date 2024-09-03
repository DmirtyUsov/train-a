import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { CarriageType } from '../../../../models/carriage.model';
import { SeatsGeneratorService } from '../../../../services/seats-generator.service';
import { BoundariesMinMax, Seats } from '../../../models';
import { SeatingSchemeComponent } from '../seating-scheme/seating-scheme.component';

@Component({
  selector: 'app-edit-carriage-popup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SeatingSchemeComponent,
  ],
  templateUrl: './edit-carriage-popup.component.html',
  styleUrl: './edit-carriage-popup.component.scss',
})
export class EditCarriagePopupComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() display: boolean = false;

  @Input() confirmButtonText: string = 'Confirm';

  @Output() displayChange = new EventEmitter<boolean>();

  @Output() confirm = new EventEmitter<CarriageType>();

  @Input() carriage: CarriageType = {
    name: '',
    rows: 0,
    code: '',
    leftSeats: 0,
    rightSeats: 0,
  };

  @Input() header!: string;

  rowsBound: BoundariesMinMax = { min: 1, max: 20 };

  colsBound: BoundariesMinMax = { min: 1, max: 4 };

  private getSeatsFn = SeatsGeneratorService.get;

  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  updateCarriage: CarriageType = {
    name: '',
    rows: 0,
    code: '',
    leftSeats: 0,
    rightSeats: 0,
  };

  form = this.fb.group({
    name: ['', [Validators.required]],
    rows: [
      0,
      [
        Validators.required,
        Validators.min(this.rowsBound.min),
        Validators.max(this.rowsBound.max),
      ],
    ],
    leftSeats: [
      0,
      [
        Validators.required,
        Validators.min(this.colsBound.min),
        Validators.max(this.colsBound.max),
      ],
    ],
    rightSeats: [
      0,
      [
        Validators.required,
        Validators.min(this.colsBound.min),
        Validators.max(this.colsBound.max),
      ],
    ],
  });

  ngOnInit(): void {
    this.subscriptions.add(
      this.form.valueChanges.subscribe((value) => {
        const { name = '', rows = 0, leftSeats = 0, rightSeats = 0 } = value;
        this.updateCarriage = {
          code: this.carriage.code || '',
          name: name || '',
          rows: rows || 0,
          leftSeats: leftSeats || 0,
          rightSeats: rightSeats || 0,
        };
      }),
    );
  }

  ngOnChanges() {
    this.form.patchValue(this.carriage);
  }

  onConfirm() {
    const {
      name = '',
      rows = 0,
      leftSeats = 0,
      rightSeats = 0,
    } = this.form.value;
    this.confirm.emit({
      code: this.carriage.code || '',
      name: name || '',
      rows: rows || 0,
      leftSeats: leftSeats || 0,
      rightSeats: rightSeats || 0,
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  getSeats(carriage: CarriageType): Seats {
    return this.getSeatsFn(carriage);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
