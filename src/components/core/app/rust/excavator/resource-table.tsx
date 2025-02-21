import Image from 'next/image';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import type { ResourceItem } from '@/types/excavator';

interface ResourceTableProps {
  resources: ResourceItem[];
  multiplier: number;
}

export function ResourceTable({ resources, multiplier }: ResourceTableProps) {
  const filteredResources = resources.filter(
    item => item.name !== 'Diesel Fuel'
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredResources.map((item, index) => (
          <TableRow key={index}>
            <TableCell className='flex items-center gap-2'>
              <Image
                src={item.image || '/placeholder.svg'}
                height={40}
                width={40}
                alt={item.name}
                className='object-contain'
              />
              {item.name}
            </TableCell>
            <TableCell className='text-primary'>
              {item.amount * multiplier}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
