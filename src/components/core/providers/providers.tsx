'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

import { BackToTop } from '@/components/core/layout/back-to-top';
import { Footer } from '@/components/core/layout/footer';
import { Navbar } from '@/components/core/layout/navbar';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <TooltipProvider>
        <div className='relative flex min-h-screen flex-col'>
          <Navbar />
          <div className='flex-1'>
            <div className='container mx-auto flex min-h-[calc(100vh-4rem-4rem)] flex-col'>
              {children}
            </div>
          </div>
          <Footer />
          <BackToTop />
        </div>
      </TooltipProvider>
      <Toaster richColors theme='system' />
    </ThemeProvider>
  );
}
