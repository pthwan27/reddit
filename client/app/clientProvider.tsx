'use client';

import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './context/authContext';
import { ModalProvider } from './context/modalContext';
import GlobalStyle from './styles/globalStyle';
import { theme } from './theme';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
