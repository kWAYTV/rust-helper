'use client';

import { Menu } from 'lucide-react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { Link } from 'next-view-transitions';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
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
      setIsScrolled(window.scrollY > 10);
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
    onClick,
    isMobile = false
  }: {
    className?: string;
    onClick?: () => void;
    isMobile?: boolean;
  }) {
    return (
      <nav
        className={cn(
          'flex flex-col gap-4 md:flex-row md:items-center md:gap-6',
          className
        )}
      >
        {navItems.map((item, index) => (
          <React.Fragment key={item.href}>
            <div className='relative'>
              <Link
                href={item.href}
                onClick={onClick}
                className={cn(
                  'text-muted-foreground hover:text-foreground text-sm transition-colors duration-200',
                  'flex w-full items-center py-2 md:w-auto md:py-0',
                  pathname === item.href && 'text-foreground font-medium',
                  isMobile && 'py-3 text-base'
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <motion.span
                    className={cn(
                      'bg-primary absolute rounded-full',
                      isMobile
                        ? 'top-1/2 right-0 h-1 w-1 -translate-y-1/2'
                        : 'bottom-[-5px] left-0 h-[2px] w-full'
                    )}
                    layoutId={
                      isMobile ? 'mobile-indicator' : 'desktop-indicator'
                    }
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            </div>
            {index < navItems.length - 1 && !isMobile && (
              <Separator
                orientation='vertical'
                className='hidden h-4 md:block'
              />
            )}
          </React.Fragment>
        ))}
      </nav>
    );
  });

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-50 w-full transition-all',
        isScrolled
          ? 'bg-background/85 supports-backdrop-filter:bg-background/75 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      )}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className='container mx-auto'>
        <nav className='flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8'>
          <motion.div
            className='flex items-center gap-6'
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Link
              href='/'
              className='group relative flex items-center pl-1 sm:pl-0'
            >
              <div className='flex items-center'>
                <span className='from-foreground to-foreground/70 group-hover:to-primary/90 bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent transition-all duration-300'>
                  Rust Helper
                </span>
                <Badge
                  variant='secondary'
                  className='ml-2 h-5 py-0 text-[10px] font-semibold uppercase'
                >
                  Beta
                </Badge>
              </div>
              <motion.span
                className='bg-primary absolute -bottom-1 left-0 h-[2px] rounded-full'
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.2 }}
              />
            </Link>
            <div className='hidden md:block'>
              <NavLinks />
            </div>
          </motion.div>

          <motion.div
            className='flex items-center gap-4'
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ModeToggle />
            <div className='md:hidden'>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='hover:bg-muted transition-colors duration-200'
                  >
                    <Menu className='h-5 w-5' />
                    <span className='sr-only'>Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side='right'
                  className='w-full border-l pr-0 sm:max-w-sm'
                >
                  <SheetHeader className='border-b px-6 pb-4 text-left'>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className='mt-6 px-6'>
                    <NavLinks
                      className='flex-col items-start gap-3'
                      onClick={() => setIsOpen(false)}
                      isMobile={true}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </motion.div>
        </nav>
      </div>
      {isScrolled && <Separator />}
    </motion.header>
  );
}
