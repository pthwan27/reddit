'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
  --font-sans: "Reddit Sans", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;

  /* Spacing (rem) */
  --rem-360: 22.5rem;
  --rem-320: 20rem;
  --rem-192: 12rem;
  --rem-144: 9rem;
  --rem-128: 8rem;
  --rem-96: 6rem;
  --rem-80: 5rem;
  --rem-64: 4rem;
  --rem-56: 3.5rem;
  --rem-48: 3rem;
  --rem-40: 2.5rem;
  --rem-32: 2rem;
  --rem-28: 1.75rem;
  --rem-24: 1.5rem;
  --rem-20: 1.25rem;
  --rem-16: 1rem;
  --rem-12: 0.75rem;
  --rem-8: 0.5rem;
  --rem-4: 0.25rem;
  --rem-2: 0.125rem;

  /* Spacers */
  --spacer-4xs: 0.125rem;
  --spacer-2xs: 0.25rem;
  --spacer-xs: 0.5rem;
  --spacer-sm: 0.75rem;
  --spacer-md: 1rem;
  --spacer-lg: 1.5rem;
  --spacer-2xl: 2rem;
  --spacer-3xl: 3rem;
  --spacer-4xl: 4rem;
  --spacer-5xl: 5rem;

  /* Sizes */
  --size-2xs: 0.25rem;
  --size-xs: 0.5rem;
  --size-sm: 0.75rem;
  --size-md: 1rem;
  --size-lg: 1.5rem;
  --size-xl: 2rem;
  --size-2xl: 2.5rem;
  --size-3xl: 3.5rem;
  --size-4xl: 4rem;
  --size-5xl: 5rem;
  --size-6xl: 6rem;

  /* Line (border) */
  --line-sm: 0.0625rem;
  --line-md: 0.125rem;
  --line-lg: 0.25rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;
  --radius-xl: 1.75rem;
  --radius-full: 624.9375rem;

  /* Font Styles */
  --font-10: normal 400 0.625rem/1rem var(--font-sans);
  --font-12: normal 400 0.75rem/1rem var(--font-sans);
  --font-14: normal 400 0.875rem/1.25rem var(--font-sans);
  --font-16: normal 400 1rem/1.25rem var(--font-sans);
  --font-18: normal 400 1.125rem/1.5rem var(--font-sans);
  --font-20: normal 400 1.25rem/1.25rem var(--font-sans);
  --font-24: normal 400 1.5rem/1.75rem var(--font-sans);
  --font-32: normal 400 2rem/2.25rem var(--font-sans);
  --font-48: normal 400 3rem/3rem var(--font-sans);
  --font-64: normal 400 4rem/4rem var(--font-sans);

  /* Font Titles */
  --font-title-h0: normal 700 4rem/4rem var(--font-sans);  
  --font-title-h1: normal 700 2rem/2.25rem var(--font-sans);
  --font-title-h2: normal 700 1.5rem/1.75rem var(--font-sans);
  --font-title-h3: normal 700 1.125rem/1.5rem var(--font-sans);
  --font-title-h4: normal 700 1rem/1.25rem var(--font-sans);
  --font-title-h5: normal 700 0.875rem/1.25rem var(--font-sans);
  --font-title-h6: normal 700 0.75rem/1rem var(--font-sans);

  /* Font Utility */
  --font-12-16-light: normal 300 0.75rem/1rem var(--font-sans);
  --font-12-16-regular: normal 400 0.75rem/1rem var(--font-sans);
  --font-12-16-semibold: normal 600 0.75rem/1rem var(--font-sans);
  --font-14-20-light: normal 300 0.875rem/1.25rem var(--font-sans);
  --font-14-20-regular: normal 400 0.875rem/1.25rem var(--font-sans);
  --font-14-20-semibold: normal 600 0.875rem/1.25rem var(--font-sans);
  --font-16-20-light: normal 300 1rem/1.25rem var(--font-sans);  
  --font-16-20-regular: normal 400 1rem/1.25rem var(--font-sans);  
  --font-16-20-semibold: normal 600 1rem/1.25rem var(--font-sans);

  /* Button Font */
  --font-button-lg: var(--font-16-20-semibold);
  --font-button-md: var(--font-14-20-semibold);
  --font-button-sm: var(--font-12-16-semibold);

  /* Label */
  --font-label-default: var(--font-12-16-regular);

  /* Box shadow */
  --box-shadow : 0 0.0625rem 0.25rem 0 #00000026, 0 0.25rem 0.25rem 0 #00000026;
  }

  /* 1. CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* 2. 기본 폰트 및 배경 */
  html, body {
    height: 100%;
    min-height: 100vh;
    width: 100%;
    min-width: 100vw;

    margin: 0;
    padding: 0;

    font-family: var(--font-sans);
    background: var(--background);
    color: var(--text);
    line-height: 1.5;
  }

  /* 3. 링크 스타일 */
  a {
    color: ${({ theme }) => theme.colors.link};
    
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.linkHover};
    text-decoration: none;
  }

  /* 4. 스크롤바 스타일 */
  ::-webkit-scrollbar {
    width: 8px;
    background: #f6f7f8;
  }
  ::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }


  /* 5. 버튼, input 등 기본 스타일 */
  button, input, textarea, select {
    outline: none;
    border: none;
    background: none;
    font: var(--font-button-md);
    padding: var(--spacer-xs) var(--spacer-sm);
    transition: background 0.2s, color 0.2s, border 0.2s;
  }
  
  button {
    border-radius: var(--radius-xl);
    cursor: pointer;

    text-wrap: nowrap;

    &:hover {
      opacity: 0.95;
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  input {
    border-radius: var(--radius-lg);
  }
  

  /* 6. 이미지 반응형 */
  img {
    max-width: 100%;
    display: block;
  }

  /* 7. 기타 유틸리티 */
  ul, ol {
    list-style: none;
  }
`;

export default GlobalStyle;
