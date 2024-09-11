export interface RouteDetails {
  routeId: number;
  stops: RouteStop[];
}

export interface RouteStop {
  departureTime?: Date;
  arrivalTime?: Date;
  stationCity: string;
}
