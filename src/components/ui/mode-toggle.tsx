'use client';

import * as React from 'react';
import { Loader2, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { setTheme, theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant='linkHover2'
        className={cn('flex items-center gap-2 p-2', className)}
      >
        <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' />
        <span className='capitalize'>Loading</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => setTheme(currentTheme === 'light' ? 'dark' : 'light')}
      variant='linkHover2'
      className={cn('flex items-center gap-2 p-2', className)}
      aria-label='Toggle theme'
    >
      <div className='flex items-center gap-2'>
        {currentTheme === 'dark' ? (
          <Sun className='h-4 w-4' aria-hidden='true' />
        ) : (
          <Moon className='h-4 w-4' aria-hidden='true' />
        )}
        <span className='capitalize'>
          {currentTheme === 'dark' ? 'Light' : 'Dark'}
        </span>
      </div>
    </Button>
  );
}
