import { newTheme } from '.';

export const subDetailPageWarmTheme = {
  ...newTheme,
  colors: {
    ...newTheme.colors,
    neutral: {
      ...newTheme.colors.neutral,
      content: '#2A3C42',
      contentDisabled: '#D6D6D6',
      contentWeak: '#576F76',
      contentStrong: '#0F1A1C',
      background: '#ffffff',
      backgroundSelected: '#EAEDEF',
      backgroundWeak: '#F9FAFA',
      backgroundMedium: '#F8F8F8',
      backgroundStrong: '#ffffff',
      backgroundHover: '#F2F4F5',
      borderStrong: '#0F1A1C',
    },
    primary: {
      ...newTheme.colors.primary,
      background: '#8b1f00',
      backgroundHover: '#6b1600',
      backgroundSelected: '#4c0c00',
      plain: '#8b1f00',
      plainHover: '#6b1600',
    },
    secondary: {
      ...newTheme.colors.secondary,
      weak: '#576F76',
      background: '#EAEDEF',
      backgroundHover: '#E2E7E9',
      backgroundSelected: '#D2DADD',
      plain: '#0F1A1C',
    },
    default: {
      ...newTheme.colors.default,
      primary: '#8b1f00',
      secondary: '#0F1A1C',
    },
    tone: {
      1: '#131313',
      2: '#434343',
      3: '#ACACAC',
      4: '#E4E4E4',
      5: '#F2F2F2',
      6: '#F8F8F8',
      7: '#ffffff',
    },
    ui: {
      canvas: '#F2F2F2',
    },
  },
};
