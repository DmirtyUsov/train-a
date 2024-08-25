export interface StationConnection {
  id: number;
  distance: number;
}

export interface Station {
  stationId: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo?: StationConnection[];
}
