import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://www.scrapcord.com/',
      images:
        'https://1xoi7lid5j.ufs.sh/f/MyoBRstFkzwbRKE7UpMeInHPcZ2sQ83oYij91JBNWEldADu6',
      siteName: 'scrapcord',
      ...override.openGraph
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@ogeperc',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images:
        'https://1xoi7lid5j.ufs.sh/f/MyoBRstFkzwbRKE7UpMeInHPcZ2sQ83oYij91JBNWEldADu6',
      ...override.twitter
    }
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_URL!}`);

export const githubUsername = 'kWAYTV';
export const githubProfileUrl = `https://github.com/${githubUsername}`;
export const githubRepoUrl = `https://github.com/${githubUsername}/rust-helper`;
