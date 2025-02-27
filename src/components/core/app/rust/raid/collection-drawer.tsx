'use client';

import { RotateCcw, ShoppingBag, X } from 'lucide-react';

import BestOptions from '@/components/core/app/rust/raid/best-options';
import CollectionList from '@/components/core/app/rust/raid/collection-list';
import RequiredResources from '@/components/core/app/rust/raid/required-resources';
import SulfurCosts from '@/components/core/app/rust/raid/sulfur-costs';
import { Badge } from '@/components/ui/badge';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  calculateAllSulfurCosts,
  calculateBestOptionsQuantities,
  calculateResources,
  useRaidStore
} from '@/store/raid';

export function CollectionDrawer() {
  const { collection, resetAll, isCollectionOpen, setCollectionOpen } =
    useRaidStore();

  const resources = calculateResources(collection);
  const sulfurCosts = calculateAllSulfurCosts(collection);
  const bestOptions = calculateBestOptionsQuantities(collection);

  const totalItems = collection.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueItems = collection.length;

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
        <Button className='fixed bottom-4 left-1/2 z-40 -translate-x-1/2 border border-gray-700 bg-black px-4 py-5 text-white shadow-lg transition-all hover:bg-gray-900'>
          <ShoppingBag className='mr-2 h-5 w-5 text-red-500' />
          <span className='text-base font-medium text-white'>
            Raid Collection
          </span>
          <Badge className='ml-2 bg-red-700 px-2 text-sm font-bold text-white'>
            {totalItems}
          </Badge>
        </Button>
      </DrawerTrigger>
      <DrawerContent className='border-border bg-background border-t'>
        <div className='mx-auto max-w-7xl'>
          <DrawerHeader className='px-4 sm:px-6'>
            <div className='flex items-center justify-between'>
              <div>
                <DrawerTitle className='text-xl font-bold tracking-tight'>
                  Raid Collection
                </DrawerTitle>
                <DrawerDescription>
                  {uniqueItems} unique item{uniqueItems !== 1 ? 's' : ''} with a
                  total of {totalItems} structure{totalItems !== 1 ? 's' : ''}
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button variant='ghost' size='icon'>
                  <X className='h-4 w-4' />
                  <span className='sr-only'>Close</span>
                </Button>
              </DrawerClose>
            </div>
            <Separator className='mt-4' />
          </DrawerHeader>

          <ScrollArea className='max-h-[60vh] overflow-y-auto px-4 pb-20 sm:px-6'>
            <div className='grid grid-cols-1 gap-8 pt-4 md:grid-cols-2'>
              <div>
                <h3 className='mb-3 font-medium'>Selected Items</h3>
                <ScrollArea className='border-border h-[300px] rounded-md border p-2 md:h-[350px]'>
                  <CollectionList collection={collection} />
                </ScrollArea>
              </div>

              <div className='space-y-8'>
                <RequiredResources resources={resources} />
                <SulfurCosts costs={sulfurCosts} />
                {Object.keys(bestOptions).length > 0 && (
                  <div className='mb-16'>
                    <BestOptions options={bestOptions} />
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>

          <DrawerFooter className='border-border bg-background sticky bottom-0 z-10 border-t px-4 py-4 sm:px-6'>
            <div className='flex justify-between'>
              <Button
                variant='destructive'
                onClick={resetAll}
                className='gap-2'
              >
                <RotateCcw className='h-4 w-4' />
                Reset All
              </Button>
              <DrawerClose asChild>
                <Button variant='outline'>Close</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
