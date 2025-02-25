'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Separator } from '@/components/ui/separator';
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sheet when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const NavLinks = React.memo(function NavLinks({
    className,
    onClick
  }: {
    className?: string;
    onClick?: () => void;
  }) {
    return (
      <div
        className={cn(
          'flex flex-col gap-4 md:flex-row md:items-center md:gap-6',
          className
        )}
      >
        {navItems.map((item, index) => (
          <React.Fragment key={item.href}>
            <Link
              href={item.href}
              onClick={onClick}
              className={cn(
                'text-muted-foreground hover:text-foreground text-sm transition-colors',
                'flex w-full items-center py-2 md:w-auto md:py-0',
                pathname === item.href && 'text-foreground font-medium'
              )}
            >
              {item.label}
            </Link>
            {index < navItems.length - 1 && (
              <Separator
                orientation='vertical'
                className='hidden h-4 md:block'
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  });

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-background/80 supports-backdrop-filter:bg-background/60 dark:bg-background/80 dark:supports-backdrop-filter:bg-background/60 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <div className='container mx-auto'>
        <nav className='flex h-16 items-center justify-between'>
          <div className='flex items-center gap-6'>
            <Link href='/' className='flex items-center pl-1 sm:pl-0'>
              <span className='text-xl font-bold'>Rust Helper</span>
            </Link>
            <div className='hidden md:block'>
              <NavLinks />
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <ModeToggle />
            <div className='md:hidden'>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <Menu className='h-5 w-5' />
                    <span className='sr-only'>Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side='right' className='w-full sm:max-w-sm'>
                  <SheetHeader className='text-left'>
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>
                  <nav className='mt-6'>
                    <NavLinks
                      className='flex-col items-start gap-1'
                      onClick={() => setIsOpen(false)}
                    />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </div>
      {isScrolled && <Separator />}
    </header>
  );
}
