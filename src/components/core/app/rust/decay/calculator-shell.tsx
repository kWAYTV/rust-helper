import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export function DecayCalculatorShell({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
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
        <CardContent className='space-y-8'>{children}</CardContent>
      </Card>
    </div>
  );
}
