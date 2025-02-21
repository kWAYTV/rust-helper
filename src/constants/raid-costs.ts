import { rustImages } from './rust-images';

export const items = [
  {
    name: 'Armored Wall',
    image: rustImages.walls.find(img => img.name === 'hqwall')?.url || '',
    destructionOptions: {
      c4: 8,
      bullets: 799,
      rockets: 15,
      satchel: 46
    },
    category: 'Walls',
    bestOption: {
      c4: 0,
      bullets: 30,
      rockets: 14,
      satchel: 0
    }
  },
  {
    name: 'Metal Wall',
    image: rustImages.walls.find(img => img.name === 'metalwall')?.url || '',
    destructionOptions: {
      c4: 4,
      bullets: 400,
      rockets: 8,
      satchel: 23
    },
    category: 'Walls',
    bestOption: {
      c4: 0,
      bullets: 15,
      rockets: 7,
      satchel: 0
    }
  },
  {
    name: 'Stone Wall',
    image: rustImages.walls.find(img => img.name === 'stonewall')?.url || '',
    destructionOptions: {
      c4: 2,
      bullets: 185,
      rockets: 4,
      satchel: 10
    },
    category: 'Walls',
    bestOption: {
      c4: 0,
      bullets: 35,
      rockets: 3,
      satchel: 0
    }
  },
  {
    name: 'Wooden Wall',
    image: rustImages.walls.find(img => img.name === 'woodenwall')?.url || '',
    destructionOptions: {
      c4: 1,
      bullets: 49,
      rockets: 2,
      satchel: 3
    },
    category: 'Walls'
  },
  {
    name: 'Strengthened window',
    image:
      rustImages.walls.find(img => img.name === 'windowglassreinforced')?.url ||
      '',
    destructionOptions: {
      c4: 2,
      bullets: 140,
      rockets: 3,
      satchel: 9
    },
    category: 'Walls',
    bestOption: {
      c4: 0,
      bullets: 30,
      rockets: 2,
      satchel: 0
    }
  },
  {
    name: 'Reinforced window',
    image:
      rustImages.walls.find(img => img.name === 'reinforcedglasswindow')?.url ||
      '',
    destructionOptions: {
      c4: 2,
      bullets: 200,
      rockets: 4,
      satchel: 12
    },
    category: 'Walls',
    bestOption: {
      c4: 0,
      bullets: 35,
      rockets: 3,
      satchel: 0
    }
  },
  {
    name: 'Sheet Metal Door',
    image: rustImages.doors.find(img => img.name === 'metaldoor')?.url || '',
    destructionOptions: {
      c4: 1,
      bullets: 63,
      rockets: 2,
      satchel: 4
    },
    category: 'Doors',
    bestOption: {
      c4: 0,
      bullets: 8,
      rockets: 1,
      satchel: 0
    }
  },
  {
    name: 'Armored Door',
    image: rustImages.doors.find(img => img.name === 'hqdoor')?.url || '',
    destructionOptions: {
      c4: 3,
      bullets: 250,
      rockets: 5,
      satchel: 15
    },
    category: 'Doors'
  },
  {
    name: 'Wooden Door',
    image: rustImages.doors.find(img => img.name === 'woodendoor')?.url || '',
    destructionOptions: {
      c4: 1,
      bullets: 19,
      rockets: 1,
      satchel: 2
    },
    category: 'Doors',
    bestOption: {
      c4: 0,
      bullets: 30,
      rockets: 4,
      satchel: 0
    }
  },
  {
    name: 'Garage Door',
    image: rustImages.doors.find(img => img.name === 'garagedoor')?.url || '',
    destructionOptions: {
      c4: 2,
      bullets: 150,
      rockets: 3,
      satchel: 9
    },
    category: 'Doors',
    bestOption: {
      c4: 0,
      bullets: 0,
      rockets: 3,
      satchel: 0
    }
  },
  {
    name: 'Ladder Hatch',
    image: rustImages.doors.find(img => img.name === 'floorladder')?.url || '',
    destructionOptions: {
      c4: 1,
      bullets: 63,
      rockets: 2,
      satchel: 4
    },
    category: 'Doors'
  },
  {
    name: 'Metal Shop Front',
    image:
      rustImages.walls.find(img => img.name === 'shopfrontmetal')?.url || '',
    destructionOptions: {
      c4: 3,
      bullets: 300,
      rockets: 6,
      satchel: 18
    },
    category: 'Doors'
  },
  {
    name: 'External Wooden Wall',
    image:
      rustImages.walls.find(img => img.name === 'woodenwallexternalhigh')
        ?.url || '',
    destructionOptions: {
      c4: 2,
      bullets: 98,
      rockets: 3,
      satchel: 6
    },
    category: 'External Walls'
  },
  {
    name: 'External Stone Wall',
    image:
      rustImages.walls.find(img => img.name === 'stonewallexternalhigh')?.url ||
      '',
    destructionOptions: {
      c4: 2,
      bullets: 185,
      rockets: 4,
      satchel: 10
    },
    category: 'External Walls'
  },
  {
    name: 'Auto Turret',
    image:
      rustImages.deployables.find(img => img.name === 'autoturret')?.url || '',
    destructionOptions: {
      c4: 1,
      bullets: 112,
      rockets: 4,
      satchel: 2
    },
    category: 'Defenses'
  },
  {
    name: 'Shotgun Trap',
    image:
      rustImages.deployables.find(img => img.name === 'guntrap')?.url || '',
    destructionOptions: {
      c4: 1,
      bullets: 34,
      rockets: 2,
      satchel: 1
    },
    category: 'Defenses'
  },
  {
    name: 'Flame Turret',
    image:
      rustImages.deployables.find(img => img.name === 'flameturret')?.url || '',
    destructionOptions: {
      c4: 1,
      bullets: 34,
      rockets: 2,
      satchel: 1
    },
    category: 'Defenses'
  },
  {
    name: 'SAM Site',
    image: rustImages.deployables.find(img => img.name === 'sam')?.url || '',
    destructionOptions: {
      c4: 1,
      bullets: 200,
      rockets: 4,
      satchel: 2
    },
    category: 'Defenses'
  },
  {
    name: 'Workbench lvl 1',
    image:
      rustImages.deployables.find(img => img.name === 'workbench1')?.url || '',
    destructionOptions: {
      c4: 1,
      bullets: 56,
      rockets: 2,
      satchel: 1
    },
    category: 'Furniture'
  },
  {
    name: 'Workbench lvl 2',
    image:
      rustImages.deployables.find(img => img.name === 'workbench2')?.url || '',
    destructionOptions: {
      c4: 1,
      bullets: 173,
      rockets: 4,
      satchel: 7
    },
    category: 'Furniture'
  },
  {
    name: 'Workbench lvl 3',
    image:
      rustImages.deployables.find(img => img.name === 'workbench3')?.url || '',
    destructionOptions: {
      c4: 2,
      bullets: 259,
      rockets: 6,
      satchel: 10
    },
    category: 'Furniture'
  },
  {
    name: 'Vending Machine',
    image:
      rustImages.deployables.find(img => img.name === 'vendingmachine')?.url ||
      '',
    destructionOptions: {
      c4: 3,
      bullets: 499,
      rockets: 10,
      satchel: 15
    },
    category: 'Furniture'
  }
];
