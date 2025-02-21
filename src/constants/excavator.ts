import { rustImages } from '@/constants/rust-images';
import {
  findRustImageUrl,
  type QuarryYield,
  type ResourceItem
} from '@/types/excavator';

export const EXCAVATOR_TIME_PER_FUEL = 120; // seconds

export const EXCAVATOR_DATA: ResourceItem[] = [
  {
    name: 'Diesel Fuel',
    amount: 1,
    image: findRustImageUrl('dieselbarrel', rustImages)
  },
  {
    name: 'High Quality Metal',
    amount: 100,
    image: findRustImageUrl('hqore', rustImages)
  },
  {
    name: 'Sulfur Ore',
    amount: 2000,
    image: findRustImageUrl('sulfurore', rustImages)
  },
  {
    name: 'Metal Fragments',
    amount: 5000,
    image: findRustImageUrl('metalfragment', rustImages)
  },
  {
    name: 'Stones',
    amount: 10000,
    image: findRustImageUrl('stone', rustImages)
  }
];

export const QUARRY_DATA: QuarryYield[] = [
  {
    type: 'HQM Quarry',
    yield: [
      {
        name: 'High Quality Metal',
        amount: 50,
        image: findRustImageUrl('hqore', rustImages)
      }
    ],
    timePerFuelInSeconds: 130,
    fuel: findRustImageUrl('dieselbarrel', rustImages)
  },
  {
    type: 'Sulfur Quarry',
    yield: [
      {
        name: 'Sulfur Ore',
        amount: 1000,
        image: findRustImageUrl('sulfurore', rustImages)
      }
    ],
    timePerFuelInSeconds: 130,
    fuel: findRustImageUrl('dieselbarrel', rustImages)
  },
  {
    type: 'Stone Quarry',
    yield: [
      {
        name: 'Metal Fragments',
        amount: 1000,
        image: findRustImageUrl('metalfragment', rustImages)
      },
      {
        name: 'Stones',
        amount: 5000,
        image: findRustImageUrl('stone', rustImages)
      }
    ],
    timePerFuelInSeconds: 130,
    fuel: findRustImageUrl('dieselbarrel', rustImages)
  }
];
