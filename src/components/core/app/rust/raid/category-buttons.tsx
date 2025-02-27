'use client';

import { memo } from 'react';

import { raidCategories } from '@/constants/raid';
import { useRaidStore } from '@/store/raid';
import { type RaidItemCategory } from '@/types/rust/raid';
import { cn } from '@/lib/utils';

interface CategoryButtonsProps {
  className?: string;
}

const CategoryButtons = memo(function CategoryButtons({
  className
}: CategoryButtonsProps) {
  const { activeCategory, setActiveCategory } = useRaidStore();

  const displayNames: Record<RaidItemCategory, string> = {
    walls: 'Walls',
    doors: 'Doors',
    defenses: 'Defenses',
    furniture: 'Furniture',
    'external-walls': 'External Walls'
  };

  return (
    <div className={cn('my-8 flex flex-wrap justify-center gap-3', className)}>
      {raidCategories.map(category => (
        <button
          key={category}
          className={cn(
            'rounded-md border border-neutral-700 px-3 py-1.5 text-sm font-medium transition-colors',
            activeCategory === category
              ? 'border-red-600 bg-red-600/10 text-red-600'
              : 'text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
          )}
          onClick={() => setActiveCategory(category)}
        >
          {displayNames[category]}
        </button>
      ))}
    </div>
  );
});

export default CategoryButtons;
