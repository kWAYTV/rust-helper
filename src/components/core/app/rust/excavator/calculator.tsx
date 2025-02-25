'use client';

import { EmptyState } from '@/components/core/app/rust/excavator/empty-state';
import { OperationContent } from '@/components/core/app/rust/excavator/operation-content';
import { OperationSelector } from '@/components/core/app/rust/excavator/operation-selector';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useExcavatorStore } from '@/store/excavator';

export function ExcavatorCalculator() {
  const { selectedOperation } = useExcavatorStore();

  return (
    <Card className='w-full'>
      <CardHeader className='space-y-2 pb-4'>
        <CardTitle className='text-center text-2xl sm:text-3xl'>
          Resource Yield Calculator
        </CardTitle>
        <CardDescription className='text-center'>
          Calculate resource yields from Excavator and Quarries
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <OperationSelector />
        {selectedOperation ? <OperationContent /> : <EmptyState />}
      </CardContent>
    </Card>
  );
}
