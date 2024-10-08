'use client';

import { ThemeProvider } from 'next-themes';
import { GlobalStyle } from '@/lib/styles/GlobalStyle';
import Header from './Header';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [isMount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, [])

  if (!isMount) {
    return null
  }
  
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