'use client';

import { Heart, Info, Trash2, Undo2 } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useDecayStore } from '@/store/decay';

interface HpInputProps {
  className?: string;
}

const HpInput = memo(function HpInput({ className }: HpInputProps) {
  const selectedMaterial = useDecayStore(state => state.selectedMaterial);
  const currentHp = useDecayStore(state => state.currentHp);
  const previousHp = useDecayStore(state => state.previousHp);
  const setHp = useDecayStore(state => state.setHp);
  const clear = useDecayStore(state => state.clear);
  const undo = useDecayStore(state => state.undo);

  const [inputValue, setInputValue] = useState<string>(
    currentHp?.toString() || ''
  );

  useEffect(() => {
    setInputValue(currentHp?.toString() || '');
  }, [currentHp]);

  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const numericValue = parseInt(value);
    if (!isNaN(numericValue)) {
      setHp(numericValue);
    }
  };

  const handleClearSelections = () => {
    clear();
    setInputValue('');
  };

  const handleUndoHpChange = () => {
    if (previousHp !== null) {
      undo();
    }
  };

  const progressPercentage =
    selectedMaterial && currentHp !== null
      ? (currentHp / selectedMaterial.maxHp) * 100
      : 0;

  const getHealthColor = () => {
    if (!selectedMaterial || currentHp === 0) return 'text-muted-foreground';
    if (progressPercentage > 66) return 'text-green-500';
    if (progressPercentage > 33) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className={className}>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Heart className='text-primary h-4 w-4' />
            <label
              htmlFor='hp-input'
              className='text-sm leading-none font-medium'
            >
              Current Health
            </label>
          </div>

          <div className='flex space-x-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-7 w-7'
                    onClick={handleClearSelections}
                    disabled={!selectedMaterial || currentHp === 0}
                  >
                    <Trash2 className='h-4 w-4' />
                    <span className='sr-only'>Clear selections</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear all selections</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-7 w-7'
                    onClick={handleUndoHpChange}
                    disabled={previousHp === 0}
                  >
                    <Undo2 className='h-4 w-4' />
                    <span className='sr-only'>Undo HP change</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Undo HP change</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='text-muted-foreground h-4 w-4' />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Enter the current HP of your structure</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className='from-background to-muted/10 rounded-md bg-gradient-to-r p-4'>
          <div className='flex items-center gap-3'>
            <Input
              id='hp-input'
              type='number'
              placeholder='Enter current HP'
              value={inputValue}
              onChange={handleHpChange}
              disabled={!selectedMaterial}
              min={1}
              max={selectedMaterial?.maxHp || 0}
              className='bg-background/80 text-center text-lg font-medium'
            />

            {selectedMaterial && (
              <span className='text-muted-foreground whitespace-nowrap'>
                /{' '}
                <span className='font-semibold'>{selectedMaterial.maxHp}</span>
              </span>
            )}
          </div>

          {selectedMaterial && currentHp > 0 && (
            <div className='mt-3 space-y-1'>
              <div className='flex justify-between text-xs'>
                <span className='text-muted-foreground'>Health Remaining:</span>
                <span className={getHealthColor()}>
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className='h-2' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default HpInput;
