import { RouteDetails, RouteStop } from '../models/route-details.model';
import { Route, Schedule } from '../models/route.model';
import { Carriage } from '../models/search-item.model';
import { SearchResponseStation, Station } from '../models/station.models';

export function mapCarriages(
  route: Route,
  schedule: Schedule,
  segmentIndex: number,
): Carriage[] {
  const uniqueCarriages = new Set(route.carriages);

  return Array.from(uniqueCarriages).map((carriageType) => {
    const price = schedule.segments[segmentIndex].price[carriageType] || 0;
    return { type: carriageType, price };
  });
}

export function transformStations(
  stations: Station[],
): SearchResponseStation[] {
  return stations.map((station) => ({
    stationId: station.id,
    city: station.city,
    geolocation: {
      latitude: station.latitude,
      longitude: station.longitude,
    },
  }));
}

export function mapRouteToDetails(
  route: Route,
  schedule: Schedule,
  stations: Station[],
): RouteDetails {
  const stops: RouteStop[] = route.path.map((stationId, index) => {
    const station = stations.find((s) => s.id === stationId);
    const stop: RouteStop = {
      stationCity: station?.city || 'Unknown',
    };

    if (index === 0) {
      stop.departureTime = new Date(schedule.segments[0].time[0]);
    } else if (index === route.path.length - 1) {
      stop.arrivalTime = new Date(
        schedule.segments[schedule.segments.length - 1].time[1],
      );
    } else {
      const previousSegment = schedule.segments[index - 1];
      const currentSegment = schedule.segments[index];
      stop.arrivalTime = new Date(previousSegment.time[1]);
      stop.departureTime = new Date(currentSegment.time[0]);
    }

    return stop;
  });

  return {
    routeId: route.id,
    stops,
  };
}
