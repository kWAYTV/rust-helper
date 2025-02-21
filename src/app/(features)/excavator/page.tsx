'use client';

import Image from 'next/image';

import { FuelCounter } from '@/components/core/app/rust/excavator/fuel-counter';
import { ResourceTable } from '@/components/core/app/rust/excavator/resource-table';
import { TimeDisplay } from '@/components/core/app/rust/excavator/time-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { EXCAVATOR_DATA, QUARRY_DATA } from '@/constants/excavator';
import { useExcavatorStore } from '@/store/excavator';
import type { OperationType } from '@/types/excavator';

export default function YieldCalculator() {
  const { selectedOperation, setOperation } = useExcavatorStore();

  const getFuelImage = () => {
    if (selectedOperation === 'Excavator') {
      return EXCAVATOR_DATA.find(item => item.name === 'Diesel Fuel')?.image;
    }
    return QUARRY_DATA.find(q => q.type === selectedOperation)?.fuel;
  };

  return (
    <main className='container mx-auto py-8'>
      <Card className='mx-auto max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-center'>
            Resource Yield Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <Select
            value={selectedOperation}
            onValueChange={value => setOperation(value as OperationType)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select operation type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Excavator'>Excavator</SelectItem>
              <SelectItem value='HQM Quarry'>HQM Quarry</SelectItem>
              <SelectItem value='Sulfur Quarry'>Sulfur Quarry</SelectItem>
              <SelectItem value='Stone Quarry'>Stone Quarry</SelectItem>
            </SelectContent>
          </Select>

          <div className='flex flex-col items-center gap-2'>
            {getFuelImage() && (
              <div className='text-center'>
                <Image
                  src={getFuelImage()! || '/placeholder.svg'}
                  height={60}
                  width={60}
                  alt='Fuel'
                  className='mx-auto'
                />
                <span className='text-muted-foreground text-sm'>
                  Diesel Fuel
                </span>
              </div>
            )}
            <FuelCounter />
          </div>

          <div className='space-y-4'>
            <ResourceTable />
            <TimeDisplay />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
