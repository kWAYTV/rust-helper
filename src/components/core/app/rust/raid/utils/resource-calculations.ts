import type { ResourceSummaryType } from '@/types/raid-calculator-types';
import type { RaidMethod, RustItem } from '@/types/raid-costs';

// Sulfur costs per raid tool
const SULFUR_COSTS = {
  c4: 2200,
  rockets: 1400,
  satchel: 480,
  bullets: 10 // per bullet
};

interface RaidCartItem {
  item: RustItem;
  quantity: number;
  method: RaidMethod;
}

export function calculateTotalResources(
  raidCart: RaidCartItem[]
): ResourceSummaryType {
  const resources: ResourceSummaryType = {
    sulfur: 0,
    gunpowder: 0,
    charcoal: 0,
    explosives: 0,
    techTrash: 0,
    metalPipes: 0,
    rope: 0,
    metalFragments: 0
  };

  raidCart.forEach(({ item, quantity, method }) => {
    const toolsNeeded = item.raidOptions[method] * quantity;
    const sulfurCost = SULFUR_COSTS[method] * toolsNeeded;

    resources.sulfur += sulfurCost;
    resources.gunpowder += Math.ceil(sulfurCost / 2);
    resources.charcoal += Math.ceil(sulfurCost / 2) * 3;

    if (method === 'c4') {
      resources.explosives += toolsNeeded * 2;
      resources.techTrash += toolsNeeded * 2;
    } else if (method === 'rockets') {
      resources.explosives += toolsNeeded;
      resources.metalPipes += toolsNeeded;
    } else if (method === 'satchel') {
      resources.rope += toolsNeeded;
      resources.metalFragments += toolsNeeded * 80;
    }
  });

  return resources;
}
