"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Reddit+Sans:ital,wght@0,200..900;1,200..900&display=swap');

  :root {
  --font-sans: "Reddit Sans", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;

  /* Spacing (rem) */
  --rem-360: 22.5rem;
  --rem-320: 20rem;
  --rem-192: 12rem;
  --rem-144: 9rem;
  --rem-128: 8rem;
  --rem-96: 6rem;
  --rem-64: 4rem;
  --rem-48: 3rem;
  --rem-40: 2.5rem;
  --rem-32: 2rem;
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
  --spacer-xl: 2rem;
  --spacer-2xl: 3rem;

  /* Sizes */
  --size-2xs: 0.25rem;
  --size-xs: 0.5rem;
  --size-sm: 0.75rem;
  --size-md: 1rem;
  --size-lg: 1.5rem;
  --size-xl: 2rem;
  --size-2xl: 3rem;
  --size-3xl: 4rem;
  --size-4xl: 6rem;
  --size-5xl: 8rem;

  /* Line (border) */
  --line-sm: 0.0625rem;
  --line-md: 0.125rem;
  --line-lg: 0.25rem;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 2rem;
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
  --font-title-h0: var(--font-64);
  --font-title-h1: var(--font-32);
  --font-title-h2: var(--font-24);
  --font-title-h3: var(--font-18);
  --font-title-h4: var(--font-16);
  --font-title-h5: var(--font-14);
  --font-title-h6: var(--font-12);

  /* Font Utility */
  --font-14-20-regular: normal 400 0.875rem/1.25rem var(--font-sans);
  --font-14-20-semibold: normal 600 0.875rem/1.25rem var(--font-sans);
  --font-16-20-regular: normal 400 1rem/1.25rem var(--font-sans);
  --font-12-16-regular: normal 400 0.75rem/1rem var(--font-sans);
  --font-12-16-semibold: normal 600 0.75rem/1rem var(--font-sans);

  /* Button Font */
  --font-button-lg: var(--font-14-20-semibold);
  --font-button-md: var(--font-14-20-semibold);
  --font-button-sm: var(--font-12-16-semibold);

  /* Label */
  --font-label-default: var(--font-12-16-regular);
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

    margin: 0;
    padding: 0;

    font-family: var(--font-sans);
    background: #EEF1F3;
    color: #1a1a1b;
    line-height: 1.5;
  }

  /* 3. 링크 스타일 */
  a {
    color: #0079D3;
    text-decoration: none;
    transition: color 0.2s;
  }
  a:hover {
    color: #005999;
    text-decoration: underline;
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
