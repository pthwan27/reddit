import { newTheme } from './index';

export const subDetailPageCoolTheme = {
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
      background: '#0045AC',
      backgroundHover: '#003584',
      backgroundSelected: '#00255D',
      plain: '#0045AC',
      plainHover: '#003584',
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
      primary: '#0045AC',
      secondary: '#0F1A1C',
    },
    // tone과 ui.canvas는 새로운 속성이므로 추가합니다.
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
