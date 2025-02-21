'use client';

import { motion, useScroll } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { ModeToggle } from '@/components/ui/mode-toggle';
import { Separator } from '@/components/ui/separator';
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
      <div className='mx-auto max-w-(--breakpoint-xl) px-4'>
        <nav className='flex flex-col py-2 md:py-0'>
          <div className='flex h-12 items-center justify-between md:h-16'>
            <Link href='/' className='flex items-center space-x-2'>
              <motion.span
                className='text-xl font-bold'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Rust Helper
              </motion.span>
            </Link>
            <ModeToggle />
          </div>
          <div className='flex justify-center py-2 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:py-0'>
            <div className='flex items-center gap-6'>
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-muted-foreground hover:text-foreground text-sm transition-colors',
                    pathname === item.href && 'text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
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
        <Separator
          className={cn(
            'transition-colors duration-200',
            isScrolled ? 'bg-border' : 'bg-transparent'
          )}
        />
      </motion.div>
    </motion.header>
  );
}
