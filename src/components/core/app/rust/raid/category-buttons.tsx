'use client';

import {
  Blocks,
  Construction,
  DoorOpen,
  GalleryVerticalEnd,
  Shield,
  X
} from 'lucide-react';
import { memo } from 'react';

import { Button } from '@/components/ui/button';
import { raidCategories } from '@/constants/raid';
import { cn } from '@/lib/utils';
import { useRaidStore } from '@/store/raid';
import { type RaidItemCategory } from '@/types/rust/raid';

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

  const categoryIcons: Record<RaidItemCategory, React.ReactNode> = {
    walls: <Blocks className='h-4 w-4' />,
    doors: <DoorOpen className='h-4 w-4' />,
    defenses: <Shield className='h-4 w-4' />,
    furniture: <Construction className='h-4 w-4' />,
    'external-walls': <GalleryVerticalEnd className='h-4 w-4' />
  };

  return (
    <div className={cn('flex flex-wrap justify-center gap-3', className)}>
      <div className='flex w-full flex-wrap items-center justify-center gap-2 sm:gap-3'>
        {raidCategories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            size='sm'
            className={cn(
              'flex h-9 items-center gap-2 transition-all duration-200',
              activeCategory === category
                ? 'border-primary shadow-sm'
                : 'border-border hover:border-primary/30 hover:bg-primary/5'
            )}
            onClick={() => setActiveCategory(category)}
          >
            {categoryIcons[category]}
            <span>{displayNames[category]}</span>
          </Button>
        ))}

        {activeCategory && (
          <Button
            variant='ghost'
            size='sm'
            className='text-muted-foreground hover:text-foreground ml-1'
            onClick={() => setActiveCategory(null)}
          >
            <X className='mr-1 h-3.5 w-3.5' />
            <span>Clear</span>
          </Button>
        )}
      </div>
    </div>
  );
});

export default CategoryButtons;
