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
        <Button
          className='border-primary/30 bg-background/95 hover:bg-primary/5 hover:border-primary/50 fixed right-4 bottom-16 z-40 flex items-center gap-2 rounded-full px-3 py-2 shadow-md backdrop-blur-sm transition-all'
          variant='outline'
        >
          <ShoppingBag className='text-primary h-5 w-5' />
          <span className='font-medium'>Raid Collection</span>
          {totalItems > 0 && (
            <Badge className='bg-primary text-primary-foreground ml-1 px-2 text-xs font-medium'>
              {totalItems}
            </Badge>
          )}
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
