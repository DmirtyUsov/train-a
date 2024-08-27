export interface StationConnection {
  id: number;
  distance: number;
}

export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo?: StationConnection[];
}

export interface SearchResponseStation {
  stationId: number;
  city: string;
  geolocation: {
    latitude: number;
    longitude: number;
  };
}
