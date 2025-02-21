import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Raid Costs Calculator',
  description: 'Calculate the costs for raids'
});

export default function RaidPage() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-6'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>Raid Costs Calculator</h1>
        <p className='text-muted-foreground mt-4'>
          Calculate the costs for raids
        </p>
      </div>
    </div>
  );
}
