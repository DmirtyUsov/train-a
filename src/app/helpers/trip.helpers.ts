// src/app/helpers/trip.helpers.ts
import { CarriageTab } from '../models/tab.model';
import { CarriageClassPipe } from '../pipes/carriage-class.pipe';
import { ScheduleSegment } from '../models/order.model';

interface Carriage {
  type: string;
  index: number;
}

export function groupCarriagesByType(
  carriagesList: string[],
  prices: Map<string, number>,
  carriageClassPipe: CarriageClassPipe,
): CarriageTab[] {
  const groupedCarriages = new Map<string, Carriage[]>();

  carriagesList.forEach((type, index) => {
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
      const classNumberA = extractClassNumber(a.title);
      const classNumberB = extractClassNumber(b.title);

      if (classNumberA === 1) return -1;
      if (classNumberB === 1) return 1;
      return classNumberA - classNumberB;
    });
}

export function extractClassNumber(title: string): number {
  const match = title.match(/(\d+)(?:st|nd|rd|th) class/);
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

export function calculateCarriagePrices(
  segments: ScheduleSegment[],
  start: number,
  end: number,
): Map<string, number> {
  const totalPrices = new Map<string, number>();

  segments.slice(start, end + 1).forEach((segment) => {
    if (segment && segment.price) {
      Object.entries(segment.price).forEach(([carriageType, price]) => {
        const currentPrice = totalPrices.get(carriageType) || 0;
        totalPrices.set(carriageType, currentPrice + Number(price));
      });
    }
  });

  return totalPrices;
}

export function findStationIndices(
  fromStationId: number,
  toStationId: number,
  routePath: number[],
): number[] {
  const result: number[] = [];

  const fromIndex = routePath.indexOf(fromStationId);
  const toIndex = routePath.indexOf(toStationId);

  if (fromIndex !== -1) {
    result.push(fromIndex);
  }

  if (toIndex !== -1) {
    result.push(toIndex - 1);
  }

  return result;
}
