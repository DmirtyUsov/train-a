import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { Ride } from '../../../../models/ride.model';

interface Carriage {
  type: string;
  index: number;
}

interface CarriageTab {
  title: string;
  carriages: Carriage[];
}

@Component({
  selector: 'app-carriage-info-list',
  standalone: true,
  imports: [CommonModule, TabViewModule],
  templateUrl: './carriage-info-list.component.html',
  styleUrls: ['./carriage-info-list.component.scss'],
})
export class CarriageInfoListComponent implements OnInit {
  @Input() ride!: Ride;

  tabs: CarriageTab[] = [];

  ngOnInit(): void {
    this.groupCarriagesByType(this.ride.carriages);
  }

  private groupCarriagesByType(carriages: string[]): void {
    const groupedCarriages = new Map<string, Carriage[]>();

    carriages.forEach((type, index) => {
      if (!groupedCarriages.has(type)) {
        groupedCarriages.set(type, []);
      }
      groupedCarriages.get(type)?.push({ type, index });
    });

    this.tabs = Array.from(groupedCarriages.entries()).map(
      ([type, carriages]) => ({
        title: `${type}`,
        carriages,
      }),
    );
  }
}
