export type RaidMethod = 'c4' | 'bullets' | 'rockets' | 'satchel';

export interface RaidOptions {
  c4: number;
  bullets: number;
  rockets: number;
  satchel: number;
}

export interface RustItem {
  name: string;
  image: string;
  raidOptions: RaidOptions;
  category: string;
  bestOption?: RaidOptions;
}

export interface CollectionItem {
  item: RustItem;
  quantity: number;
}

export interface SortedSulfurCost {
  item: string;
  quantity: number;
}

export interface Resource {
  name: string;
  image: string;
  quantity: number;
}
