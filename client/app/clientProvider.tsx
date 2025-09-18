"use client";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import GlobalStyle from "./styles/globalStyle";
import { AuthProvider } from "./context/authContext";
import { ModalProvider } from "./context/modalContext";

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
