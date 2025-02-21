import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Raid Costs Calculator',
  description: 'Plan and calculate resource costs for raids in Rust'
});

export default function RaidPage() {
  return (
    <div className='container mx-auto py-8'>
      <div className='mb-8 text-center'>
        <h1 className='text-4xl font-bold'>Raid Costs Calculator</h1>
        <p className='text-muted-foreground mt-4'>
          Plan your raids and calculate total resource costs
        </p>
      </div>
    </div>
  );
}
