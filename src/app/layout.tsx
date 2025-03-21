import Header from '@/components/layouts/Header';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Genie Docs',
  description: 'Generate your docs with AI',
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
