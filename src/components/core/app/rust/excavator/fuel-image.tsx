'use client';

import Image from 'next/image';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';
import { EXCAVATOR_DATA, QUARRY_DATA } from '@/constants/excavator';
import { useExcavatorStore } from '@/store/excavator';

export function FuelImage() {
  const { selectedOperation } = useExcavatorStore();

  const getFuelImage = () => {
    if (selectedOperation === 'Excavator') {
      return EXCAVATOR_DATA.find(item => item.name === 'Diesel Fuel')?.image;
    }
    return QUARRY_DATA.find(q => q.type === selectedOperation)?.fuel;
  };

  const fuelImage = getFuelImage();

  if (!fuelImage) return null;

  return (
    <div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className='flex cursor-help justify-center'>
            <div className='relative h-12 w-12 transition-transform hover:scale-110'>
              <Image
                src={fuelImage}
                alt='Fuel'
                fill
                sizes='3rem'
                className='object-contain'
              />
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className='w-80'>
          <div className='flex justify-between space-x-4'>
            <div className='space-y-1'>
              <h4 className='text-sm font-semibold'>Required Fuel</h4>
              <p className='text-muted-foreground text-sm'>
                Adjust the fuel amount below to calculate resource yields
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
