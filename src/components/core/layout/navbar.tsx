'use client';

import { Menu } from 'lucide-react';
import { motion, useScroll } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { navItems } from '@/constants/navigation';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  React.useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest: number) => {
      setIsScrolled(latest > 0);
    });

    return () => unsubscribe();
  }, [scrollY]);

  const NavLinks = React.memo(function NavLinks({
    className
  }: {
    className?: string;
  }) {
    return (
      <div
        className={cn(
          'flex flex-col gap-4 md:flex-row md:items-center md:gap-6',
          className
        )}
      >
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-muted-foreground hover:text-foreground text-sm transition-colors',
              pathname === item.href && 'text-foreground font-medium'
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    );
  });

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 supports-backdrop-filter:bg-background/60 dark:bg-background/80 dark:supports-backdrop-filter:bg-background/60 backdrop-blur-md'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className='container mx-auto'>
        <nav className='flex h-16 items-center justify-between'>
          <div className='flex items-center gap-6'>
            <Link href='/' className='flex items-center space-x-2'>
              <motion.span
                className='text-xl font-bold'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Rust Helper
              </motion.span>
            </Link>
            <div className='hidden md:block'>
              <NavLinks />
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <ModeToggle />
            <div className='md:hidden'>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <Menu className='h-5 w-5' />
                    <span className='sr-only'>Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side='right'>
                  <SheetHeader>
                    <SheetTitle>Rust Helper</SheetTitle>
                  </SheetHeader>
                  <div className='mt-8'>
                    <NavLinks className='flex-col items-start' />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>
      <motion.div
        className='w-full'
        animate={{
          opacity: isScrolled ? 1 : 0,
          height: isScrolled ? '1px' : '0px'
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={cn(
            'h-px w-full transition-colors duration-200',
            isScrolled ? 'bg-border' : 'bg-transparent'
          )}
        />
      </motion.div>
    </motion.header>
  );
}
