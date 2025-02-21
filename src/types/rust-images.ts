export interface RustImage {
  name: string;
  url: string;
  alt?: string;
}

export interface RustImageCategories {
  // Core categories from raid-costs.ts
  walls: RustImage[];
  doors: RustImage[];
  ['external-walls']: RustImage[];
  deployables: RustImage[];

  // Resource categories
  components: RustImage[];
  resources: RustImage[];
  raid: RustImage[];
}
