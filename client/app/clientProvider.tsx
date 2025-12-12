'use client';

import { ThemeProvider } from 'styled-components';

import AuthInitializer from './layout/authInitializer';
import GlobalStyle from './styles/globalStyle';
import { newTheme } from './theme';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={newTheme}>
      <GlobalStyle />
      <AuthInitializer />
      {children}
    </ThemeProvider>
  );
}
