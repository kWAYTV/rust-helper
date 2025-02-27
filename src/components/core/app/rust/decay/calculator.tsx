import ClientDecayCalculator from '@/components/core/app/rust/decay/client-calculator';
import { Card, CardContent } from '@/components/ui/card';

export function DecayCalculator() {
  return (
    <Card className='w-full shadow-md'>
      <CardContent className='p-6'>
        <ClientDecayCalculator />
      </CardContent>
    </Card>
  );
}
