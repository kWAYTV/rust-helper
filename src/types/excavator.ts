import type { RustImageCategories } from './rust-images';

export interface ResourceItem {
  name: string;
  amount: number;
  image: string;
}

export interface QuarryYield {
  type: string;
  yield: ResourceItem[];
  timePerFuelInSeconds: number;
  fuel: string;
}

export type OperationType =
  | 'Excavator'
  | 'HQM Quarry'
  | 'Sulfur Quarry'
  | 'Stone Quarry';

// Updated helper function to work with RustImageCategories
export function findRustImageUrl(
  name: string,
  images: RustImageCategories
): string {
  const categories: (keyof RustImageCategories)[] = [
    'walls',
    'doors',
    'external-walls',
    'deployables',
    'components',
    'resources',
    'raid'
  ];

  for (const category of categories) {
    const image = images[category].find(
      img => img.name.toLowerCase() === name.toLowerCase()
    );
    if (image) return image.url;
  }
  return '/placeholder.svg';
}
