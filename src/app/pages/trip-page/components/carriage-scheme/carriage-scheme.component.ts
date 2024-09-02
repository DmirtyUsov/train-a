import { Component, Input, OnInit } from '@angular/core';
import { CarriageType } from '../../../../models/carriage.model';

@Component({
  selector: 'app-carriage-scheme',
  standalone: true,
  imports: [],
  templateUrl: './carriage-scheme.component.html',
  styleUrl: './carriage-scheme.component.scss',
})
export class CarriageSchemeComponent implements OnInit {
  @Input() carriageIndex!: number;
  @Input() carriageInfo!: CarriageType | undefined;

  ngOnInit(): void {
    console.log('carriage', this.carriageInfo);
  }
}
