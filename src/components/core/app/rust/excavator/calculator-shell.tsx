import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export function ExcavatorCalculatorShell({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Card className='w-full'>
        <CardHeader className='space-y-2 pb-4'>
          <div>
            <CardTitle className='text-center text-2xl sm:text-3xl'>
              Resource Yield Calculator
            </CardTitle>
            <CardDescription className='text-center'>
              Calculate resource yields from Excavator and Quarries
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>{children}</CardContent>
      </Card>
    </div>
  );
}
