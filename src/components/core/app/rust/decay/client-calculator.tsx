'use client';

import { Info, RefreshCw, Trash2, Undo2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
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
  TooltipTrigger
} from '@/components/ui/tooltip';
import { materials } from '@/constants/decay';
import { useDecayStore } from '@/store/decay';
import { type Material } from '@/types/decay/decay';

export function ClientDecayCalculator() {
  // Use selectors to prevent unnecessary re-renders
  const selectedMaterial = useDecayStore(state => state.selectedMaterial);
  const currentHp = useDecayStore(state => state.currentHp);
  const decayInfo = useDecayStore(state => state.decayInfo);
  const previousHp = useDecayStore(state => state.previousHp);
  const setMaterial = useDecayStore(state => state.setMaterial);
  const setHp = useDecayStore(state => state.setHp);
  const clear = useDecayStore(state => state.clear);
  const undo = useDecayStore(state => state.undo);

  const [inputValue, setInputValue] = useState<string>(
    currentHp?.toString() || ''
  );

  // Sync input value with store
  useEffect(() => {
    setInputValue(currentHp?.toString() || '');
  }, [currentHp]);

  // Handle material selection
  const handleMaterialChange = (value: string) => {
    setMaterial(value);
  };

  // Handle HP input
  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const numericValue = parseInt(value);
    if (!isNaN(numericValue)) {
      setHp(numericValue);
    }
  };

  // Handle clear selections
  const handleClearSelections = () => {
    clear();
    setInputValue('');
  };

  // Handle undo HP change
  const handleUndoHpChange = () => {
    if (previousHp !== null) {
      undo();
    }
  };

  // Calculate progress percentage
  const progressPercentage =
    selectedMaterial && currentHp !== null
      ? (currentHp / selectedMaterial.maxHp) * 100
      : 0;

  return (
    <Card className='w-full'>
      <CardHeader className='space-y-2'>
        <div>
          <CardTitle className='text-center text-2xl sm:text-3xl'>
            Decay Calculator
          </CardTitle>
          <CardDescription className='text-center'>
            Calculate when your walls will decay based on their current HP
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='space-y-8'>
        <div className='space-y-4'>
          {/* Material Selector */}
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='material-select'
                className='text-sm leading-none font-medium'
              >
                Material
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className='text-muted-foreground h-4 w-4' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the material type to calculate decay time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={selectedMaterial?.name || ''}
              onValueChange={handleMaterialChange}
            >
              <SelectTrigger id='material-select'>
                <SelectValue placeholder='Select material' />
              </SelectTrigger>
              <SelectContent>
                {materials.map((material: Material) => (
                  <SelectItem key={material.name} value={material.name}>
                    {material.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* HP Input */}
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

          {/* Decay Info */}
          {decayInfo && decayInfo.timeLeft && (
            <div className='space-y-2 rounded-md border p-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm leading-none font-medium'>
                  Decay Information
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant='outline'
                        size='icon'
                        className='h-6 w-6'
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
              <div className='space-y-1'>
                <p className='text-muted-foreground text-sm'>
                  Time until decay:
                </p>
                <p className='text-lg font-semibold'>{decayInfo.timeLeft}</p>
              </div>
              <div className='space-y-1'>
                <p className='text-muted-foreground text-sm'>Decay date:</p>
                <p className='text-lg font-semibold'>
                  {decayInfo.decayDateTime}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
