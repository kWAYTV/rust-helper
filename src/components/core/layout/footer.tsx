'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-background/95 w-full border-t'>
      <div className='text-muted-foreground/80 mx-auto max-w-[900px] py-2 text-center text-[11px]'>
        <div>
          Built by{' '}
          <Link
            href='https://github.com/kWAYTV'
            target='_blank'
            rel='noreferrer'
            className='text-foreground/70 hover:text-foreground'
          >
            kWAY
          </Link>
          . The source code is available on{' '}
          <Link
            href='https://github.com/kWAYTV/rust-helper'
            target='_blank'
            rel='noreferrer'
            className='text-foreground/70 hover:text-foreground'
          >
            GitHub
          </Link>
          .
        </div>
        <div className='mt-1'>
          This site is not affiliated with or endorsed by Facepunch Studios or
          the Rust game. All game assets, logos, and trademarks are the property
          of their respective owners.
        </div>
      </div>
    </footer>
  );
}
