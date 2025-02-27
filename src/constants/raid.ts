import { type DestructionMethod, type RaidItem } from '@/types/rust/raid';

// Sulfur cost per raid tool
export const sulfurCostPerUnit: Record<DestructionMethod, number> = {
  c4: 2200,
  rockets: 1400,
  satchel: 480,
  bullets: 25
};

// Raid categories
export const raidCategories = [
  'walls',
  'doors',
  'defenses',
  'furniture',
  'external-walls'
] as const;

// Raid items data
export const raidItems: RaidItem[] = [
  {
    id: 'armored-wall',
    name: 'Armored Wall',
    imageKey: 'hqwall',
    destructionOptions: {
      c4: 8,
      bullets: 799,
      rockets: 15,
      satchel: 46
    },
    category: 'walls',
    bestOption: {
      c4: 0,
      bullets: 30,
      rockets: 14,
      satchel: 0
    }
  },
  {
    id: 'metal-wall',
    name: 'Metal Wall',
    imageKey: 'metalwall',
    destructionOptions: {
      c4: 4,
      bullets: 400,
      rockets: 8,
      satchel: 23
    },
    category: 'walls',
    bestOption: {
      c4: 0,
      bullets: 15,
      rockets: 7,
      satchel: 0
    }
  },
  {
    id: 'stone-wall',
    name: 'Stone Wall',
    imageKey: 'stonewall',
    destructionOptions: {
      c4: 2,
      bullets: 185,
      rockets: 4,
      satchel: 10
    },
    category: 'walls',
    bestOption: {
      c4: 0,
      bullets: 35,
      rockets: 3,
      satchel: 0
    }
  },
  {
    id: 'wooden-wall',
    name: 'Wooden Wall',
    imageKey: 'woodenwall',
    destructionOptions: {
      c4: 1,
      bullets: 49,
      rockets: 2,
      satchel: 3
    },
    category: 'walls'
  },
  {
    id: 'strengthened-window',
    name: 'Strengthened Window',
    imageKey: 'windowglassreinforced',
    destructionOptions: {
      c4: 2,
      bullets: 140,
      rockets: 3,
      satchel: 9
    },
    category: 'walls',
    bestOption: {
      c4: 0,
      bullets: 30,
      rockets: 2,
      satchel: 0
    }
  },
  {
    id: 'reinforced-window',
    name: 'Reinforced Window',
    imageKey: 'reinforcedglasswindow',
    destructionOptions: {
      c4: 2,
      bullets: 200,
      rockets: 4,
      satchel: 12
    },
    category: 'walls',
    bestOption: {
      c4: 0,
      bullets: 35,
      rockets: 3,
      satchel: 0
    }
  },
  {
    id: 'sheet-metal-door',
    name: 'Sheet Metal Door',
    imageKey: 'metaldoor',
    destructionOptions: {
      c4: 1,
      bullets: 63,
      rockets: 2,
      satchel: 4
    },
    category: 'doors',
    bestOption: {
      c4: 0,
      bullets: 8,
      rockets: 1,
      satchel: 0
    }
  },
  {
    id: 'armored-door',
    name: 'Armored Door',
    imageKey: 'hqdoor',
    destructionOptions: {
      c4: 3,
      bullets: 250,
      rockets: 5,
      satchel: 15
    },
    category: 'doors'
  },
  {
    id: 'wooden-door',
    name: 'Wooden Door',
    imageKey: 'woodendoor',
    destructionOptions: {
      c4: 1,
      bullets: 19,
      rockets: 1,
      satchel: 2
    },
    category: 'doors',
    bestOption: {
      c4: 0,
      bullets: 30,
      rockets: 4,
      satchel: 0
    }
  },
  {
    id: 'garage-door',
    name: 'Garage Door',
    imageKey: 'garagedoor',
    destructionOptions: {
      c4: 2,
      bullets: 150,
      rockets: 3,
      satchel: 9
    },
    category: 'doors',
    bestOption: {
      c4: 0,
      bullets: 0,
      rockets: 3,
      satchel: 0
    }
  },
  {
    id: 'ladder-hatch',
    name: 'Ladder Hatch',
    imageKey: 'floorladder',
    destructionOptions: {
      c4: 1,
      bullets: 63,
      rockets: 2,
      satchel: 4
    },
    category: 'doors'
  },
  {
    id: 'metal-shop-front',
    name: 'Metal Shop Front',
    imageKey: 'shopfrontmetal',
    destructionOptions: {
      c4: 3,
      bullets: 300,
      rockets: 6,
      satchel: 18
    },
    category: 'doors'
  },
  {
    id: 'external-wooden-wall',
    name: 'External Wooden Wall',
    imageKey: 'woodenwallexternalhigh',
    destructionOptions: {
      c4: 2,
      bullets: 98,
      rockets: 3,
      satchel: 6
    },
    category: 'external-walls'
  },
  {
    id: 'external-stone-wall',
    name: 'External Stone Wall',
    imageKey: 'stonewallexternalhigh',
    destructionOptions: {
      c4: 2,
      bullets: 185,
      rockets: 4,
      satchel: 10
    },
    category: 'external-walls'
  },
  {
    id: 'auto-turret',
    name: 'Auto Turret',
    imageKey: 'autoturret',
    destructionOptions: {
      c4: 1,
      bullets: 112,
      rockets: 4,
      satchel: 2
    },
    category: 'defenses'
  },
  {
    id: 'shotgun-trap',
    name: 'Shotgun Trap',
    imageKey: 'guntrap',
    destructionOptions: {
      c4: 1,
      bullets: 34,
      rockets: 2,
      satchel: 1
    },
    category: 'defenses'
  },
  {
    id: 'flame-turret',
    name: 'Flame Turret',
    imageKey: 'flameturret',
    destructionOptions: {
      c4: 1,
      bullets: 34,
      rockets: 2,
      satchel: 1
    },
    category: 'defenses'
  },
  {
    id: 'sam-site',
    name: 'SAM Site',
    imageKey: 'sam',
    destructionOptions: {
      c4: 1,
      bullets: 200,
      rockets: 4,
      satchel: 2
    },
    category: 'defenses'
  },
  {
    id: 'workbench-1',
    name: 'Workbench lvl 1',
    imageKey: 'workbench1',
    destructionOptions: {
      c4: 1,
      bullets: 56,
      rockets: 2,
      satchel: 1
    },
    category: 'furniture'
  },
  {
    id: 'workbench-2',
    name: 'Workbench lvl 2',
    imageKey: 'workbench2',
    destructionOptions: {
      c4: 1,
      bullets: 173,
      rockets: 4,
      satchel: 7
    },
    category: 'furniture'
  },
  {
    id: 'workbench-3',
    name: 'Workbench lvl 3',
    imageKey: 'workbench3',
    destructionOptions: {
      c4: 2,
      bullets: 259,
      rockets: 6,
      satchel: 10
    },
    category: 'furniture'
  },
  {
    id: 'vending-machine',
    name: 'Vending Machine',
    imageKey: 'vendingmachine',
    destructionOptions: {
      c4: 3,
      bullets: 499,
      rockets: 10,
      satchel: 15
    },
    category: 'furniture'
  }
];

// Resource images mapping
export const resourceImageKeys: Record<DestructionMethod, string> = {
  c4: 'c4',
  bullets: 'bullets',
  rockets: 'rockets',
  satchel: 'satchel'
};

export const sulfurImageKey = 'sulfur';
