import { SearchItem } from './search-item.model';

export interface Tab {
  title: string;
  items: SearchItem[];
}

interface Carriage {
  type: string;
  index: number;
}

export interface CarriageTab {
  title: string;
  price: number;
  carriages: Carriage[];
}
