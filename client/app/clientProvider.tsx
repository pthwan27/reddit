'use client';

import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './context/authContext';
import { ModalProvider } from './context/modalContext';
import SubProvider from './context/subContext';
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
        <SubProvider>
          <ModalProvider>{children}</ModalProvider>
        </SubProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
