'use client';

import {
  ArrowRight,
  Clock,
  Cog,
  HelpCircle,
  Minus,
  Plus,
  RefreshCw,
  Timer
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { formatTimeString } from '@/components/core/app/rust/excavator/time-formatter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { EXCAVATOR_DATA, QUARRY_DATA } from '@/constants/excavator';
import { useExcavatorStore } from '@/store/excavator';
import type { OperationType } from '@/types/excavator/excavator';

// Define operations outside component to avoid recreation on each render
const OPERATIONS: OperationType[] = [
  'Excavator',
  'HQM Quarry',
  'Sulfur Quarry',
  'Stone Quarry'
];

export function ClientCalculator() {
  // Use selectors to prevent unnecessary re-renders
  const selectedOperation = useExcavatorStore(state => state.selectedOperation);
  const dieselFuel = useExcavatorStore(state => state.dieselFuel);
  const totalTime = useExcavatorStore(state => state.totalTime);
  const resources = useExcavatorStore(state => state.resources);

  // Actions
  const setOperation = useExcavatorStore(state => state.setOperation);
  const incrementFuel = useExcavatorStore(state => state.incrementFuel);
  const decrementFuel = useExcavatorStore(state => state.decrementFuel);
  const setDieselFuel = useExcavatorStore(state => state.setDieselFuel);
  const clear = useExcavatorStore(state => state.clear);

  // Local state for input field
  const [inputValue, setInputValue] = useState(dieselFuel.toString());

  // Sync input value with store when dieselFuel changes
  useEffect(() => {
    setInputValue(dieselFuel.toString());
  }, [dieselFuel]);

  // Get fuel image
  const fuelImage =
    selectedOperation === 'Excavator'
      ? EXCAVATOR_DATA.find(item => item.name === 'Diesel Fuel')?.image
      : QUARRY_DATA.find(q => q.type === selectedOperation)?.fuel;

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      setDieselFuel(numValue);
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    const numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue < 1) {
      setInputValue('1');
      setDieselFuel(1);
    }
  };

  return (
    <>
      {/* Operation Header */}
      <div className='from-primary/10 via-primary/5 to-background rounded-lg bg-gradient-to-r p-6 shadow-sm'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-bold sm:text-3xl'>
              Resource Yield Calculator
            </h1>
            <p className='text-muted-foreground mt-1'>
              Calculate resource yields from mining operations
            </p>
          </div>

          <div className='w-full sm:w-64'>
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
        </div>
      </div>

      {selectedOperation ? (
        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Fuel Controls */}
          <Card className='lg:col-span-1'>
            <CardHeader className='pb-3'>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <Clock className='text-primary h-5 w-5' />
                Fuel Input
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Fuel image */}
              {fuelImage && (
                <div className='flex justify-center'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className='bg-muted/50 relative flex h-20 w-20 items-center justify-center rounded-full p-1'>
                          <Image
                            src={fuelImage}
                            alt='Diesel Fuel'
                            width={60}
                            height={60}
                            className='object-contain'
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Diesel Fuel Required</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}

              {/* Fuel counter */}
              <div className='space-y-3'>
                <Label htmlFor='fuel-amount'>Fuel Amount</Label>
                <div className='flex items-center gap-3'>
                  <Button
                    variant='outline'
                    size='icon'
                    disabled={dieselFuel <= 1}
                    onClick={decrementFuel}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>

                  <input
                    id='fuel-amount'
                    type='number'
                    min='1'
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-center text-lg font-medium tabular-nums focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
                  />

                  <Button variant='outline' size='icon' onClick={incrementFuel}>
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              {/* Duration display */}
              <div className='space-y-3'>
                <div className='flex items-center gap-2'>
                  <Label>Operation Duration</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className='text-muted-foreground h-4 w-4' />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total time based on fuel amount</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className='bg-muted/50 flex items-center justify-center rounded-md p-3'>
                  <div className='flex items-center gap-2'>
                    <Timer className='text-primary h-5 w-5' />
                    <span className='text-xl font-bold tracking-tight tabular-nums'>
                      {formatTimeString(totalTime)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reset button */}
              <Button variant='outline' className='w-full' onClick={clear}>
                <RefreshCw className='mr-2 h-4 w-4' />
                Reset Calculator
              </Button>
            </CardContent>
          </Card>

          {/* Resource Yields */}
          <Card className='lg:col-span-2'>
            <CardHeader className='pb-3'>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <ArrowRight className='text-primary h-5 w-5' />
                Resource Yields
              </CardTitle>
            </CardHeader>
            <CardContent>
              {resources.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Resource</TableHead>
                      <TableHead className='text-right'>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.map((item, index) => (
                      <TableRow key={`${item.name}-${index}`}>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <div className='bg-muted/30 relative h-10 w-10 overflow-hidden rounded-md'>
                              <Image
                                src={item.image || '/placeholder.svg'}
                                alt={item.name}
                                fill
                                sizes='40px'
                                className='object-contain p-1'
                                priority={index < 2}
                              />
                            </div>
                            <span>{item.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className='text-primary text-right font-medium tabular-nums'>
                          {item.amount * dieselFuel}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className='flex h-40 items-center justify-center'>
                  <p className='text-muted-foreground text-center'>
                    No resources available for this operation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className='py-12'>
          <CardContent>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='bg-muted/50 flex h-20 w-20 items-center justify-center rounded-full'>
                <Cog className='text-muted-foreground h-10 w-10' />
              </div>
              <h3 className='text-xl font-medium'>Select an Operation</h3>
              <p className='text-muted-foreground max-w-md'>
                Choose an operation type from the dropdown above to calculate
                resource yields
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
