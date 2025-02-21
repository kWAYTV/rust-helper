'use client';

import { Clock, Timer } from 'lucide-react';

import { Progress } from '@/components/ui/progress';
import { useDecayStore } from '@/store/decay';

export function DecayInfo() {
  const { decayInfo, selectedMaterial, currentHp } = useDecayStore();

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Timer className='h-5 w-5 text-muted-foreground' />
          <span>Time until decay:</span>
        </div>
        <span className='font-semibold text-primary'>{decayInfo.timeLeft}</span>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Clock className='h-5 w-5 text-muted-foreground' />
          <span>Decay date:</span>
        </div>
        <span className='font-medium text-muted-foreground'>{decayInfo.decayDateTime}</span>
      </div>
      <Progress 
        value={selectedMaterial ? (currentHp / selectedMaterial.maxHp) * 100 : 0} 
        className='h-2' 
      />
    </div>
  );
}
