import type { NavItem } from '@/types/navigation';

export const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    description: 'Home page with tools and calculators for Rust gameplay.'
  },
  {
    href: '/raid',
    label: 'Raid Calculator',
    description:
      'Calculate resources needed to raid different structures. Find the most efficient raiding methods.'
  },
  {
    href: '/excavator',
    label: 'Excavator',
    description:
      'Optimize your resource gathering with Excavator yield calculations and timing estimates.'
  },
  {
    href: '/decay',
    label: 'Decay Calculator',
    description:
      'Monitor decay times for different structures based on material type and current health.'
  }
];
