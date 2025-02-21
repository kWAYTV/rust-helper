export interface RustImage {
  name: string;
  url: string;
  alt?: string;
}

export interface RustImageCategories {
  walls: RustImage[];
  doors: RustImage[];
  ['external-walls']: RustImage[];
  deployables: RustImage[];
  components: RustImage[];
  resources: RustImage[];
  raid: RustImage[];
}
