export interface RustImage {
  name: string;
  url: string;
  alt?: string;
}

export interface RustImageCategories {
  components: RustImage[];
  deployables: RustImage[];
  doors: RustImage[];
  raid: RustImage[];
  resources: RustImage[];
  walls: RustImage[];
}
