'use client';

import { Clock, HelpCircle, Minus, Plus, RefreshCw, Timer } from 'lucide-react';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { EXCAVATOR_DATA, QUARRY_DATA } from '@/constants/excavator';
import { formatTimeString } from '@/helpers/date';
import { useExcavatorStore } from '@/store/excavator';

interface FuelInputProps {
  className?: string;
}

const FuelInput = memo(function FuelInput({ className }: FuelInputProps) {
  const selectedOperation = useExcavatorStore(state => state.selectedOperation);
  const dieselFuel = useExcavatorStore(state => state.dieselFuel);
  const totalTime = useExcavatorStore(state => state.totalTime);
  const incrementFuel = useExcavatorStore(state => state.incrementFuel);
  const decrementFuel = useExcavatorStore(state => state.decrementFuel);
  const setDieselFuel = useExcavatorStore(state => state.setDieselFuel);
  const clear = useExcavatorStore(state => state.clear);

  const [inputValue, setInputValue] = useState(dieselFuel.toString());

  useEffect(() => {
    setInputValue(dieselFuel.toString());
  }, [dieselFuel]);

  const fuelImage =
    selectedOperation === 'Excavator'
      ? EXCAVATOR_DATA.find(item => item.name === 'Diesel Fuel')?.image
      : QUARRY_DATA.find(q => q.type === selectedOperation)?.fuel;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setDieselFuel(numValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue < 1) {
      setInputValue('1');
      setDieselFuel(1);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className='pb-3'>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <Clock className='text-primary h-5 w-5' />
          Fuel Input
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Fuel image */}
        {fuelImage && (
          <div className='flex justify-center'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='bg-muted/50 relative flex h-20 w-20 items-center justify-center rounded-full p-1'>
                    <Image
                      src={fuelImage}
                      alt='Diesel Fuel'
                      width={60}
                      height={60}
                      className='object-contain'
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Diesel Fuel Required</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Fuel counter */}
        <div className='space-y-3'>
          <Label htmlFor='fuel-amount'>Fuel Amount</Label>
          <div className='flex items-center gap-3'>
            <Button
              variant='outline'
              size='icon'
              disabled={dieselFuel <= 1}
              onClick={decrementFuel}
            >
              <Minus className='h-4 w-4' />
            </Button>

            <input
              id='fuel-amount'
              type='number'
              min='1'
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-center text-lg font-medium tabular-nums focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
            />

            <Button variant='outline' size='icon' onClick={incrementFuel}>
              <Plus className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Duration display */}
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <Label>Operation Duration</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className='text-muted-foreground h-4 w-4' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total time based on fuel amount</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className='bg-muted/50 flex items-center justify-center rounded-md p-3'>
            <div className='flex items-center gap-2'>
              <Timer className='text-primary h-5 w-5' />
              <span className='text-xl font-bold tracking-tight tabular-nums'>
                {formatTimeString(totalTime)}
              </span>
            </div>
          </div>
        </div>

        {/* Reset button */}
        <Button variant='outline' className='w-full' onClick={clear}>
          <RefreshCw className='mr-2 h-4 w-4' />
          Reset Calculator
        </Button>
      </CardContent>
    </Card>
  );
});

export default FuelInput;
