export type DestructionMethod = 'c4' | 'bullets' | 'rockets' | 'satchel';

export interface DestructionOptions {
  c4: number;
  bullets: number;
  rockets: number;
  satchel: number;
}

export interface RustItem {
  name: string;
  image: string;
  destructionOptions: DestructionOptions;
  category: string;
  bestOption?: DestructionOptions;
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
