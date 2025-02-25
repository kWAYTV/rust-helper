import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { Providers } from '@/components/core/providers/providers';
import { createMetadata } from '@/lib/metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export const metadata = createMetadata({
  title: {
    default: 'Rust Helper',
    template: '%s | Rust Helper'
  },
  description: 'Your handy Rust game helper for raids and offlines'
});
