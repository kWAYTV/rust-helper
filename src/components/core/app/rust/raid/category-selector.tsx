'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategorySelector({
  categories,
  selectedCategory,
  onSelectCategory
}: CategorySelectorProps) {
  return (
    <Card className='p-2'>
      <div className='flex flex-wrap justify-center gap-2'>
        {categories.map((category, index) => (
          <div key={category} className='flex items-center'>
            {index > 0 && (
              <Separator
                orientation='vertical'
                className='mx-2 hidden h-4 sm:block'
              />
            )}
            <button
              onClick={() => onSelectCategory(category)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
              )}
            >
              {category}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}
