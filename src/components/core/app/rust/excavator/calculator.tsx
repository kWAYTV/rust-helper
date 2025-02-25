'use client';

import { ExcavatorCalculatorShell } from '@/components/core/app/rust/excavator/calculator-shell';
import { EmptyState } from '@/components/core/app/rust/excavator/empty-state';
import { OperationContent } from '@/components/core/app/rust/excavator/operation-content';
import { OperationSelector } from '@/components/core/app/rust/excavator/operation-selector';
import { useExcavatorStore } from '@/store/excavator';

export function ExcavatorCalculator() {
  const { selectedOperation } = useExcavatorStore();

  return (
    <ExcavatorCalculatorShell>
      <div>
        <OperationSelector />
      </div>

      <div>{selectedOperation ? <OperationContent /> : <EmptyState />}</div>
    </ExcavatorCalculatorShell>
  );
}
