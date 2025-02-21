import Image from 'next/image';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useExcavatorStore } from '@/store/excavator';

export function ResourceTable() {
  const { resources, dieselFuel } = useExcavatorStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resources.map((item, index) => (
          <TableRow key={index}>
            <TableCell className='flex items-center gap-2'>
              <Image
                src={item.image || '/placeholder.svg'}
                height={40}
                width={40}
                alt={item.name}
                className='object-contain'
                sizes="40px"
                priority={index < 2}
              />
              {item.name}
            </TableCell>
            <TableCell className='text-primary'>
              {item.amount * dieselFuel}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
