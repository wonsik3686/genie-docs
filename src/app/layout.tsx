import Header from '@/components/layouts/Header';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Genie Docs - AI 기반 문서 관리 도구',
  description:
    'AI와 노션을 활용한 스마트한 문서 관리 솔루션. 반복적인 문서 작업은 Genie Docs에게 맡기고 더 중요한 일에 집중하세요.',
  keywords: ['문서 관리', 'AI', 'Notion', '자동화', '생산성'],
  authors: [{ name: 'Genie Docs Team' }],
  openGraph: {
    title: 'Genie Docs - AI 기반 문서 관리 도구',
    description:
      'AI와 노션을 활용한 스마트한 문서 관리 솔루션. 반복적인 문서 작업은 Genie Docs에게 맡기고 더 중요한 일에 집중하세요.',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Genie Docs',
    images: [
      {
        url: '/gd-og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genie Docs - AI 기반 문서 관리 도구',
    description:
      'AI와 노션을 활용한 스마트한 문서 관리 솔루션. 반복적인 문서 작업은 Genie Docs에게 맡기고 더 중요한 일에 집중하세요.',
    images: [
      {
        url: '/gd-og-image.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },

  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={'antialiased'}>
        <QueryProvider>
          <ThemeProvider>
            <SidebarProvider>
              <Header />
              {children}
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
