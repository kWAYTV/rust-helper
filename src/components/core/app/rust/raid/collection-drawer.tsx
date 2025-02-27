'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import {
  calculateAllSulfurCosts,
  calculateBestOptionsQuantities,
  calculateResources,
  useRaidStore
} from '@/store/raid';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

import CollectionList from '@/components/core/app/rust/raid/collection-list';
import RequiredResources from '@/components/core/app/rust/raid/required-resources';
import SulfurCosts from '@/components/core/app/rust/raid/sulfur-costs';
import BestOptions from '@/components/core/app/rust/raid/best-options';

export function CollectionDrawer() {
  const { collection, resetAll, isCollectionOpen, setCollectionOpen } =
    useRaidStore();

  const resources = calculateResources(collection);
  const sulfurCosts = calculateAllSulfurCosts(collection);
  const bestOptions = calculateBestOptionsQuantities(collection);

  const totalItems = collection.reduce((sum, item) => sum + item.quantity, 0);

  if (collection.length === 0) {
    return null;
  }

  return (
    <Drawer
      open={isCollectionOpen}
      onOpenChange={setCollectionOpen}
      direction='bottom'
    >
      <DrawerTrigger asChild>
        <Button
          variant='outline'
          className='fixed bottom-4 left-1/2 z-40 -translate-x-1/2 border border-neutral-700 bg-black'
        >
          <span className='mr-2 rounded-sm bg-red-600 px-2 py-0.5 text-xs'>
            {totalItems}
          </span>
          View Raid Collection
        </Button>
      </DrawerTrigger>
      <DrawerContent className='border-t border-neutral-800 bg-black'>
        <div className='mx-auto w-full max-w-7xl'>
          <DrawerHeader>
            <DrawerTitle className='text-xl'>Raid Collection</DrawerTitle>
            <DrawerDescription>
              Items you've added for raiding calculation
            </DrawerDescription>
            <Separator className='mt-4 bg-neutral-800' />
          </DrawerHeader>

          <div className='grid grid-cols-1 gap-8 p-4 pb-0 md:grid-cols-2'>
            <div>
              <h3 className='mb-3 font-medium'>Selected Items</h3>
              <ScrollArea className='h-[300px] w-full rounded-md border border-neutral-800 p-2 md:h-[350px]'>
                <CollectionList collection={collection} />
              </ScrollArea>
            </div>

            <div className='space-y-8'>
              <RequiredResources resources={resources} />

              <SulfurCosts costs={sulfurCosts} />

              {Object.keys(bestOptions).length > 0 && (
                <BestOptions options={bestOptions} />
              )}
            </div>
          </div>

          <DrawerFooter className='flex-row justify-between'>
            <Button variant='destructive' onClick={resetAll}>
              Reset All
            </Button>
            <DrawerClose asChild>
              <Button variant='outline'>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
