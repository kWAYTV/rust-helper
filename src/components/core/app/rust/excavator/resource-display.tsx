'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useExcavatorStore } from '@/store/excavator';

interface ResourceDisplayProps {
  className?: string;
}

const ResourceDisplay = memo(function ResourceDisplay({
  className
}: ResourceDisplayProps) {
  const dieselFuel = useExcavatorStore(state => state.dieselFuel);
  const resources = useExcavatorStore(state => state.resources);

  return (
    <Card className={className}>
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
  );
});

export default ResourceDisplay;
