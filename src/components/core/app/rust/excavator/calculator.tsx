'use client';

import Image from 'next/image';

import { FuelCounter } from '@/components/core/app/rust/excavator/fuel-counter';
import { ResourceTable } from '@/components/core/app/rust/excavator/resource-table';
import { TimeDisplay } from '@/components/core/app/rust/excavator/time-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { EXCAVATOR_DATA, QUARRY_DATA } from '@/constants/excavator';
import { useExcavatorStore } from '@/store/excavator';
import type { OperationType } from '@/types/excavator/excavator';

export function ExcavatorCalculator() {
  const { selectedOperation, setOperation } = useExcavatorStore();

  const getFuelImage = () => {
    if (selectedOperation === 'Excavator') {
      return EXCAVATOR_DATA.find(item => item.name === 'Diesel Fuel')?.image;
    }
    return QUARRY_DATA.find(q => q.type === selectedOperation)?.fuel;
  };

  return (
    <Card className='w-full'>
      <CardHeader className='space-y-2'>
        <CardTitle className='text-center text-2xl sm:text-3xl'>
          Resource Yield Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>
        <div className='space-y-2'>
          <Label htmlFor='operation-type'>Operation Type</Label>
          <Select
            value={selectedOperation}
            onValueChange={value => setOperation(value as OperationType)}
          >
            <SelectTrigger id='operation-type'>
              <SelectValue placeholder='Select operation type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Excavator'>Excavator</SelectItem>
              <SelectItem value='HQM Quarry'>HQM Quarry</SelectItem>
              <SelectItem value='Sulfur Quarry'>Sulfur Quarry</SelectItem>
              <SelectItem value='Stone Quarry'>Stone Quarry</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='flex flex-col items-center gap-6'>
          {getFuelImage() && (
            <div className='relative h-16 w-16'>
              <Image
                src={getFuelImage()!}
                alt='Fuel'
                fill
                sizes='(max-width: 768px) 4rem, 4rem'
                className='object-contain'
              />
            </div>
          )}

          <div className='w-full space-y-8'>
            <FuelCounter />
            <TimeDisplay />
            <ResourceTable />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
