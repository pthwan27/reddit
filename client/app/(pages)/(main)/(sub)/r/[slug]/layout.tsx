'use client';

import { ReactNode } from 'react';

import { ThemeProvider } from 'styled-components';

import { subDetailPageCoolTheme } from '@/app/theme/coolTheme';

interface SubDetailLayoutProps {
  children: ReactNode;
}

export default function SubDetailLayout({ children }: SubDetailLayoutProps) {
  return (
    <ThemeProvider theme={subDetailPageCoolTheme}>{children}</ThemeProvider>
  );
}
