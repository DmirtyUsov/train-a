import { CarriageTab } from '../models/tab.model';
import { CarriageClassPipe } from '../pipes/carriage-class.pipe';
import { Order, ScheduleSegment } from '../models/order.model';
import { CarriageType } from '../models/carriage.model';

interface Carriage {
  type: string;
  index: number;
}

export function extractClassNumber(title: string): number {
  const match = title.match(/(\d+)(?:st|nd|rd|th) class/);
  return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
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

export function getDepartureTime(order: Order): Date {
  const [startSegmentIndex] = findStationIndices(
    order.stationStart,
    order.stationEnd,
    order.path,
  );
  return new Date(order.schedule.segments[startSegmentIndex].time[0]);
}

export function buildTrainScheme(
  carriageTypes: CarriageType[],
  carriages: string[],
  seatId: number,
): { carIndex: number; carType: string; seatNumberInCar: number } | null {
  let currentSeatCount = 0;

  for (let carIndex = 0; carIndex < carriages.length; carIndex += 1) {
    const carriageCode = carriages[carIndex];
    const carriageType = carriageTypes.find(
      (type) => type.code === carriageCode,
    );

    if (carriageType) {
      const seatsInCarriage =
        carriageType.rows * (carriageType.leftSeats + carriageType.rightSeats);

      if (seatId <= currentSeatCount + seatsInCarriage) {
        const seatNumberInCar = seatId - currentSeatCount;
        return {
          carIndex,
          carType: carriageType.name,
          seatNumberInCar,
        };
      }

      currentSeatCount += seatsInCarriage;
    }
  }

  return null; // If the seatId is out of bounds
}
