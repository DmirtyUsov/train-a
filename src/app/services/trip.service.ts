import { Injectable } from '@angular/core';
import { CarriageTab } from '../models/tab.model';
import { CarriageClassPipe } from '../pipes/carriage-class.pipe';

interface Carriage {
  type: string;
  index: number;
}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  constructor() {}

  groupCarriagesByType(
    carriages: string[],
    prices: Map<string, number>,
    carriageClassPipe: CarriageClassPipe,
  ): CarriageTab[] {
    const groupedCarriages = new Map<string, Carriage[]>();

    carriages.forEach((type, index) => {
      if (!groupedCarriages.has(type)) {
        groupedCarriages.set(type, []);
      }
      groupedCarriages.get(type)?.push({ type, index });
    });

    return Array.from(groupedCarriages.entries())
      .map(([type, carriages]) => {
        const className = carriageClassPipe.transform(type);
        return {
          title: `${className} - ${prices.get(type) || 0} Credits`,
          price: prices.get(type) || 0,
          carriages,
        };
      })
      .sort((a, b) => {
        const classNumberA = this.extractClassNumber(a.title);
        const classNumberB = this.extractClassNumber(b.title);

        if (classNumberA === 1) return -1;
        if (classNumberB === 1) return 1;
        return classNumberA - classNumberB;
      });
  }

  private extractClassNumber(title: string): number {
    const match = title.match(/(\d+)(?:st|nd|rd|th) class/);
    return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
  }

  calculateCarriagePrices(
    segments: any[],
    start: number,
    end: number,
  ): Map<string, number> {
    const totalPrices = new Map<string, number>();

    for (let i = start; i <= end; i++) {
      const segment = segments[i];
      if (segment && segment.price) {
        for (const [carriageType, price] of Object.entries(segment.price)) {
          const currentPrice = totalPrices.get(carriageType) || 0;
          totalPrices.set(carriageType, currentPrice + Number(price));
        }
      }
    }

    return totalPrices;
  }
}
