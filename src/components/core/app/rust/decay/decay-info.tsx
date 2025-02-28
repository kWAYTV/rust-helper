'use client';

import { AlertTriangle, Calendar, Clock, RefreshCw } from 'lucide-react';
import { memo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      <CardHeader className='pb-3'>
        <CardTitle className='flex items-center justify-between text-lg'>
          <div className='flex items-center gap-2'>
            <AlertTriangle className='text-primary h-5 w-5' />
            <span>Decay Information</span>
          </div>
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
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-5'>
          <div className='from-primary/5 to-background rounded-lg border bg-gradient-to-br p-4'>
            <div className='flex items-center gap-3'>
              <Badge variant='outline' className='px-3 py-1.5'>
                {selectedMaterial.name}
              </Badge>
              <div className='text-muted-foreground text-xs'>
                Max HP: {selectedMaterial.maxHp}
              </div>
            </div>
          </div>

          <Separator className='bg-primary/10' />

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
            <div className='space-y-2'>
              <div className='text-muted-foreground flex items-center gap-1.5 text-sm font-medium'>
                <Clock className='text-primary h-4 w-4' />
                <span>Time until decay:</span>
              </div>
              <p className='text-2xl font-bold tracking-tight'>
                {decayInfo.timeLeft}
              </p>
            </div>

            <div className='space-y-2'>
              <div className='text-muted-foreground flex items-center gap-1.5 text-sm font-medium'>
                <Calendar className='text-primary h-4 w-4' />
                <span>Decay date:</span>
              </div>
              <p className='text-md font-medium'>{decayInfo.decayDateTime}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default DecayInfo;
