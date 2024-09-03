'use client';

import { ThemeProvider } from 'next-themes';
import { GlobalStyle } from '@/lib/styles/GlobalStyle';
import Header from './Header';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider>
        <header>
          <Header />
        </header>
        <main>
          {children}
        </main>
      </ThemeProvider>
    </>
  );
}