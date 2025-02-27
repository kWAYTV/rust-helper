'use client';

import { Cog, Timer } from 'lucide-react';
import { memo } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useExcavatorStore } from '@/store/excavator';
import type { OperationType } from '@/types/excavator/excavator';

// Define operations outside component to avoid recreation on each render
const OPERATIONS: OperationType[] = [
  'Excavator',
  'HQM Quarry',
  'Sulfur Quarry',
  'Stone Quarry'
];

interface OperationSelectorProps {
  className?: string;
}

const OperationSelector = memo(function OperationSelector({
  className
}: OperationSelectorProps) {
  const selectedOperation = useExcavatorStore(state => state.selectedOperation);
  const setOperation = useExcavatorStore(state => state.setOperation);

  return (
    <div className={className}>
      <Select
        value={selectedOperation || ''}
        onValueChange={value => {
          if (OPERATIONS.includes(value as OperationType)) {
            setOperation(value as OperationType);
          }
        }}
      >
        <SelectTrigger id='operation-type' className='w-full'>
          <SelectValue placeholder='Select operation type' />
        </SelectTrigger>
        <SelectContent>
          {OPERATIONS.map(operation => (
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
});

export default OperationSelector;
