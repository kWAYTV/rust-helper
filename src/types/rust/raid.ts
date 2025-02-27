export type DestructionMethod = 'c4' | 'bullets' | 'rockets' | 'satchel';

export interface DestructionOptions {
  c4: number;
  bullets: number;
  rockets: number;
  satchel: number;
}

export type BestOptions = DestructionOptions;

export interface RaidItem {
  id: string;
  name: string;
  imageKey: string;
  destructionOptions: DestructionOptions;
  category: RaidItemCategory;
  bestOption?: BestOptions;
}

export type RaidItemCategory =
  | 'walls'
  | 'doors'
  | 'defenses'
  | 'furniture'
  | 'external-walls';

export interface CollectionItem {
  item: RaidItem;
  quantity: number;
}

export interface SulfurCost {
  method: DestructionMethod;
  quantity: number;
}

export interface Resource {
  name: string;
  imageKey: string;
  quantity: number;
}

export interface RaidState {
  // Collection
  collection: CollectionItem[];
  selectedMethod: DestructionMethod;
  activeCategory: RaidItemCategory | null;

  // UI State
  isCollectionOpen: boolean;

  // Actions
  setActiveCategory: (category: RaidItemCategory | null) => void;
  setSelectedMethod: (method: DestructionMethod) => void;
  addItem: (item: RaidItem) => void;
  removeItem: (item: RaidItem) => void;
  resetAll: () => void;
  setCollectionOpen: (isOpen: boolean) => void;
}
