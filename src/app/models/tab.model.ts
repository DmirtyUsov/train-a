import { CarriageType } from './carriage.model';
import { SearchItem } from './search-item.model';

export interface Tab {
  title: string;
  items: SearchItem[];
}

export interface tabCarriage {
  type: string;
  index: number;
  carriageInfo?: CarriageType;
}

export interface CarriageTab {
  title: string;
  price: number;
  carriages: tabCarriage[];
}
