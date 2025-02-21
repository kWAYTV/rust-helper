'use client';

import { ArrowUpDown, HelpCircle, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useDecayStore } from '@/store/decay';

export function HpInput() {
  const {
    currentHp,
    selectedMaterial,
    previousMaterial,
    previousHp,
    setHp,
    clear,
    undo
  } = useDecayStore();

  return (
    <div className='space-y-1.5'>
      <div className='flex items-center gap-2'>
        <Label htmlFor='current-hp'>Current HP</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className='h-4 w-4 text-muted-foreground' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Enter the current health points of your structure</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='flex items-center gap-2'>
        <Input
          id='current-hp'
          type='number'
          value={currentHp || ''}
          onChange={e => setHp(Number(e.target.value))}
          className='w-full'
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                onClick={clear}
                disabled={!selectedMaterial && !currentHp}
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear selection</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                onClick={undo}
                disabled={!previousMaterial && !previousHp}
              >
                <ArrowUpDown className='h-4 w-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Undo last change</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
