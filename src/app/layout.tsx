import Header from '@/components/layouts/Header';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
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
      <body className={`antialiased`}>
        <QueryProvider>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
