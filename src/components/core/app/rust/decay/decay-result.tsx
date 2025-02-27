'use client';

import { memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { useDecayStore } from '@/store/decay';

import DecayInfo from '@/components/core/app/rust/decay/decay-info';
import ResultSkeleton from '@/components/core/app/rust/decay/result-skeleton';

interface DecayResultProps {
  className?: string;
}

const DecayResult = memo(function DecayResult({ className }: DecayResultProps) {
  const isLoading = useDecayStore(state => state.isLoading);
  const selectedMaterial = useDecayStore(state => state.selectedMaterial);
  const currentHp = useDecayStore(state => state.currentHp);

  const calculationInProgress = isLoading;
  const noCalculation = !selectedMaterial || !currentHp;

  if (noCalculation) {
    return (
      <div className={className}>
        <Card className='h-full'>
          <CardContent className='flex h-full items-center justify-center p-6'>
            <p className='text-muted-foreground text-center'>
              Select a material and enter HP to calculate decay time
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (calculationInProgress) {
    return <ResultSkeleton className={className} />;
  }

  return <DecayInfo className={className} />;
});

export default DecayResult;
