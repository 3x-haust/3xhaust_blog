'use client'

import { GlobalStyle } from '../styles/globalStyle';
import Header from './Header';
import StyledComponentsRegistry from './registry';
import { ThemeProvider } from 'styled-components'
import useDarkModeState from '../stores/darkmode'
import ThemeDetector from '../util/ThemeDetector'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isDark } = useDarkModeState()

  const theme = {
    colors: {
      background: isDark ? 'rgb(32, 33, 37)' : 'white',
      text: isDark ? 'white' : 'black',
    },
  }

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <StyledComponentsRegistry>
            <ThemeDetector />
            <GlobalStyle />
            <header>
              <Header />
            </header>
            <main>
              {children}
            </main>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}