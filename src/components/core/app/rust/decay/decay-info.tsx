'use client';

import { Clock, RefreshCw } from 'lucide-react';
import { memo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useDecayStore } from '@/store/decay';

interface DecayInfoProps {
  className?: string;
}

const DecayInfo = memo(function DecayInfo({ className }: DecayInfoProps) {
  const decayInfo = useDecayStore(state => state.decayInfo);
  const selectedMaterial = useDecayStore(state => state.selectedMaterial);

  if (!decayInfo || !decayInfo.timeLeft || !selectedMaterial) {
    return null;
  }

  return (
    <Card className={className}>
      <CardContent className='pt-6'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h3 className='text-md font-medium'>Decay Information</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-7 w-7'
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCw className='h-4 w-4' />
                    <span className='sr-only'>Refresh</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh calculations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className='bg-card rounded-lg border p-4'>
            <div className='flex items-center gap-3'>
              <Badge variant='outline' className='px-3 py-1.5'>
                {selectedMaterial.name}
              </Badge>
              <div className='text-muted-foreground text-xs'>
                Max HP: {selectedMaterial.maxHp}
              </div>
            </div>
          </div>

          <Separator />

          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <div className='text-muted-foreground flex items-center gap-1.5 text-sm'>
                <Clock className='text-primary h-3.5 w-3.5' />
                <span>Time until decay:</span>
              </div>
              <p className='text-lg font-semibold'>{decayInfo.timeLeft}</p>
            </div>

            <div className='space-y-2'>
              <p className='text-muted-foreground text-sm'>Decay date:</p>
              <p className='text-md font-medium'>{decayInfo.decayDateTime}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default DecayInfo;
