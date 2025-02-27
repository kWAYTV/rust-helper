'use client';

import { Info, Trash2, Undo2 } from 'lucide-react';
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

  return (
    <div className={className}>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='hp-input'
            className='text-sm leading-none font-medium'
          >
            Current HP
          </label>
          <div className='flex space-x-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-6 w-6'
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
                    className='h-6 w-6'
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
        <div className='flex items-center space-x-2'>
          <Input
            id='hp-input'
            type='number'
            placeholder='Enter current HP'
            value={inputValue}
            onChange={handleHpChange}
            disabled={!selectedMaterial}
            min={1}
            max={selectedMaterial?.maxHp || 0}
          />
          {selectedMaterial && (
            <span className='text-muted-foreground text-sm whitespace-nowrap'>
              / {selectedMaterial.maxHp}
            </span>
          )}
        </div>
        {selectedMaterial && currentHp > 0 && (
          <Progress value={progressPercentage} className='h-2' />
        )}
      </div>
    </div>
  );
});

export default HpInput;
