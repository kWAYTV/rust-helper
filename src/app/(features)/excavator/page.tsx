'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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
import {
  EXCAVATOR_DATA,
  EXCAVATOR_TIME_PER_FUEL,
  QUARRY_DATA
} from '@/constants/excavator';
import type { OperationType } from '@/types/excavator';

export default function YieldCalculator() {
  const [dieselFuel, setDieselFuel] = useState(1);
  const [selectedOperation, setSelectedOperation] =
    useState<OperationType>('Excavator');
  const [timePerFuel, setTimePerFuel] = useState(EXCAVATOR_TIME_PER_FUEL);
  const [totalTime, setTotalTime] = useState(EXCAVATOR_TIME_PER_FUEL);

  useEffect(() => {
    if (selectedOperation === 'Excavator') {
      setTimePerFuel(EXCAVATOR_TIME_PER_FUEL);
    } else {
      const quarry = QUARRY_DATA.find(q => q.type === selectedOperation);
      setTimePerFuel(quarry?.timePerFuelInSeconds ?? EXCAVATOR_TIME_PER_FUEL);
    }
  }, [selectedOperation]);

  useEffect(() => {
    setTotalTime(dieselFuel * timePerFuel);
  }, [dieselFuel, timePerFuel]);

  const getCurrentData = () => {
    if (selectedOperation === 'Excavator') {
      return EXCAVATOR_DATA;
    }
    return QUARRY_DATA.find(q => q.type === selectedOperation)?.yield ?? [];
  };

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
            onValueChange={value =>
              setSelectedOperation(value as OperationType)
            }
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
            <FuelCounter value={dieselFuel} onChange={setDieselFuel} />
          </div>

          <div className='space-y-4'>
            <ResourceTable
              resources={getCurrentData()}
              multiplier={dieselFuel}
            />
            <TimeDisplay totalSeconds={totalTime} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
