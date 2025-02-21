import type { Material } from '@/types/decay/decay';

export const materials: Material[] = [
  { name: 'Twig', maxHp: 10, decayTime: 1 },
  { name: 'Wood', maxHp: 250, decayTime: 3 },
  { name: 'Stone', maxHp: 500, decayTime: 5 },
  { name: 'Sheet Metal', maxHp: 1000, decayTime: 8 },
  { name: 'Armored', maxHp: 2000, decayTime: 12 }
];
