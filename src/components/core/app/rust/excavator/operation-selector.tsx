'use client';

import { Cog, HelpCircle, Timer } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useExcavatorStore } from '@/store/excavator';
import type { OperationType } from '@/types/excavator/excavator';

export function OperationSelector() {
  const { selectedOperation, setOperation } = useExcavatorStore();

  const operations: OperationType[] = ['Excavator', 'HQM Quarry', 'Sulfur Quarry', 'Stone Quarry'];

  return (
    <div className='space-y-1.5'>
      <div className='flex items-center gap-2'>
        <Label htmlFor='operation-type'>Operation Type</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className='h-4 w-4 text-muted-foreground' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Choose your mining operation to calculate yields</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select
        value={selectedOperation || ''}
        onValueChange={value => {
          if (operations.includes(value as OperationType)) {
            setOperation(value as OperationType);
          }
        }}
      >
        <SelectTrigger id='operation-type' className='w-full'>
          <SelectValue placeholder='Select operation type' />
        </SelectTrigger>
        <SelectContent>
          {operations.map(operation => (
            <SelectItem key={operation} value={operation}>
              <div className='flex items-center gap-2'>
                {operation === 'Excavator' ? (
                  <>
                    <Cog className='h-4 w-4' />
                    {operation}
                    <Badge variant='secondary' className='ml-auto'>
                      Large Scale
                    </Badge>
                  </>
                ) : (
                  <>
                    <Timer className='h-4 w-4' />
                    {operation}
                  </>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
