'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
  --font-sans: "Reddit Sans", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;

  /* Spacing (rem) */
  --rem-1440: 90rem;
  --rem-1080: 67.5rem;
  --rem-720: 45rem;
  --rem-640: 40rem;
  --rem-480: 30rem;
  --rem-400: 25rem; 
  --rem-360: 22.5rem;
  --rem-320: 20rem;
  --rem-304: 19rem;
  --rem-288: 18rem;
  --rem-192: 12rem;
  --rem-144: 9rem;
  --rem-128: 8rem;
  --rem-96: 6rem;
  --rem-88: 5.5rem;
  --rem-80: 5rem;
  --rem-72: 4.5rem;
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
  --spacer-md-lg: 1.25rem;
  --spacer-lg: 1.5rem;
  --spacer-xl: 1.75rem;
  --spacer-2xl: 2rem;
  --spacer-2-5xl: 2.5rem;
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
  --radius-xs: 0.25rem;
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.25rem;
  --radius-2xl: 1.5rem;
  --radius-3xl: 1.75rem;
  --radius-full: 624.9375rem;

/* Font Styles */
  --font-10: normal 400 0.625rem var(--font-sans);
  --font-12: normal 400 0.75rem var(--font-sans);
  --font-14: normal 400 0.875rem var(--font-sans);
  --font-16: normal 400 1rem var(--font-sans);
  --font-18: normal 400 1.125rem var(--font-sans);
  --font-20: normal 400 1.25rem var(--font-sans);
  --font-24: normal 400 1.5rem var(--font-sans);
  --font-32: normal 400 2rem var(--font-sans);
  --font-48: normal 400 3rem var(--font-sans);
  --font-64: normal 400 4rem var(--font-sans);

/* Font Titles */
  --font-title-h0: normal 700 4rem var(--font-sans);  
  --font-title-h1: normal 700 2rem var(--font-sans);
  --font-title-h2: normal 700 1.5rem var(--font-sans);
  --font-title-h3: normal 700 1.125rem var(--font-sans);
  --font-title-h4: normal 700 1rem var(--font-sans);
  --font-title-h5: normal 700 0.875rem var(--font-sans);
  --font-title-h6: normal 700 0.75rem var(--font-sans);

/* Font Utility */
  --font-12-16-light: normal 300 0.75rem var(--font-sans);
  --font-12-16-regular: normal 400 0.75rem var(--font-sans);
  --font-12-16-semibold: normal 600 0.75rem var(--font-sans);
  --font-12-16-bold: normal 700 0.75rem var(--font-sans);
  --font-14-20-light: normal 300 0.875rem var(--font-sans);
  --font-14-20-regular: normal 400 0.875rem var(--font-sans);
  --font-14-20-semibold: normal 600 0.875rem var(--font-sans);
  --font-14-20-bold: normal 700 0.875rem var(--font-sans);
  --font-16-20-light: normal 300 1rem var(--font-sans);  
  --font-16-20-regular: normal 400 1rem var(--font-sans);  
  --font-16-20-semibold: normal 600 1rem var(--font-sans);
  --font-16-20-bold: normal 700 1rem var(--font-sans);
  --font-18-20-light: normal 300 1.25rem var(--font-sans);  
  --font-18-20-regular: normal 400 1.25rem var(--font-sans);  
  --font-18-20-semibold: normal 600 1.25rem var(--font-sans);
  --font-18-20-bold: normal 700 1.25rem var(--font-sans);

  --font-24-light: normal 300 1.5rem var(--font-sans);
  --font-24-regular: normal 400 1.5rem var(--font-sans);
  --font-24-semibold: normal 600 1.5rem var(--font-sans);
  --font-24-bold: normal 700 1.5rem var(--font-sans);


  /* Label */
  --font-label-default: var(--font-12-16-regular);

  /* Box shadow */
  --box-shadow : 0 1px 1px rgba(0,0,0,0.11), 
              0 2px 2px rgba(0,0,0,0.11), 
              0 4px 4px rgba(0,0,0,0.11), 
              0 6px 8px rgba(0,0,0,0.11),
              0 8px 16px rgba(0,0,0,0.11);

              
  /* Container Width */
  --flex-nav-width : 272px;
  --expanded-nav-width : 272px;

  /* Transition */
  --transition-duration: 250ms;
  --transition-curve: cubic-bezier(0.65, 0, 0.35, 1);
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

    margin: 0 auto;
    padding: 0px !important;

    font-family: var(--font-sans);
    background: #FFFFFF;
    color: var(--text);
    line-height: 1.5;
  }

  /* 3. 링크 스타일 */
  a {
    
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s;
  }
  a:hover {
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
    border-radius: var(--radius-3xl);
    background: ${({ theme }) => theme.colors.global.white};
    border: solid ${({ theme }) => theme.components.button.borderWidth.default} transparent;

    cursor: pointer;

    text-wrap: nowrap;

    &:hover {
      border: solid ${({ theme }) => theme.components.button.borderWidth.default} transparent;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  input {
    border-radius: var(--radius-xl);
  }
  label {
    border-color : transparent;
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


  h1, h2, h3, h4, h5, h6 {
    text-wrap: nowrap;
  }

  span{
    line-height: 1.2;
    text-wrap: nowrap;
  }

  button {
    text-wrap: nowrap;
  }
  hr {
    border: 0;
    border-bottom: 0.0625rem solid #00000019;
  }
  a{
    color: ${({ theme }) => theme.colors.default.primary || '#115BCA'};
  }
`;

export default GlobalStyle;
