'use client';

import { ThemeProvider } from 'next-themes';
import { ViewTransitions } from 'next-view-transitions';
import { Toaster } from '@/components/ui/sonner';

import { BackToTop } from '@/components/core/layout/back-to-top';
import { Footer } from '@/components/core/layout/footer';
import { Navbar } from '@/components/core/layout/navbar';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <ViewTransitions>
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
      </ViewTransitions>
      <Toaster theme='system' />
    </ThemeProvider>
  );
}
