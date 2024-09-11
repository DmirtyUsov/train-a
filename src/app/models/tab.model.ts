import { CarriageType } from './carriage.model';
import { SearchItem } from './search-item.model';

export interface Tab {
  title: string;
  items: SearchItem[];
}

export interface TabCarriage {
  type: string;
  index: number;
  carriageInfo?: CarriageType;
}

export interface CarriageTab {
  title: string;
  price: number;
  carriages: TabCarriage[];
}
