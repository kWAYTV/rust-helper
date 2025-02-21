'use client';

import ResourceCard from '@/components/core/app/rust/raid/resource-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { rustImages } from '@/constants/rust-images';
import type { ResourceSummaryType } from '@/types/raid-calculator-types';

interface ResourceSummaryProps {
  resources: ResourceSummaryType;
}

export default function ResourceSummary({ resources }: ResourceSummaryProps) {
  return (
    <Card className='mt-4'>
      <CardHeader>
        <CardTitle>Total Resources Required</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'>
          <ResourceCard
            name='Sulfur'
            quantity={resources.sulfur}
            icon={rustImages.raid.find(i => i.name === 'sulfur')?.url || ''}
          />

          <ResourceCard
            name='Gunpowder'
            quantity={resources.gunpowder}
            icon={rustImages.raid.find(i => i.name === 'gunpowder')?.url || ''}
          />

          <ResourceCard name='Charcoal' quantity={resources.charcoal} icon='' />

          {resources.explosives > 0 && (
            <ResourceCard
              name='Explosives'
              quantity={resources.explosives}
              icon=''
            />
          )}

          {resources.techTrash > 0 && (
            <ResourceCard
              name='Tech Trash'
              quantity={resources.techTrash}
              icon={
                rustImages.components.find(i => i.name === 'techtrash')?.url ||
                ''
              }
            />
          )}

          {resources.metalPipes > 0 && (
            <ResourceCard
              name='Metal Pipes'
              quantity={resources.metalPipes}
              icon={
                rustImages.components.find(i => i.name === 'metalpipe')?.url ||
                ''
              }
            />
          )}

          {resources.rope > 0 && (
            <ResourceCard
              name='Rope'
              quantity={resources.rope}
              icon={
                rustImages.components.find(i => i.name === 'rope')?.url || ''
              }
            />
          )}

          {resources.metalFragments > 0 && (
            <ResourceCard
              name='Metal Fragments'
              quantity={resources.metalFragments}
              icon={
                rustImages.resources.find(i => i.name === 'metalfragment')
                  ?.url || ''
              }
            />
          )}
        </div>

        <div className='text-muted-foreground mt-6 text-sm'>
          <p className='text-center'>
            This calculator provides an estimate of resources required based on
            standard raid costs in Rust. Actual in-game results may vary due to
            random factors and game updates.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
