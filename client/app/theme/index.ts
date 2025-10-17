'use client';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      primaryDarkHover: string;

      secondaryLight: string;
      secondary: string;
      secondaryDark: string;
      upvote: string;
      downvote: string;

      white: string;
      dark: string;
      background: string;
      grayBackground: string;
      grayHover: string;
      darkgrayBackground: string;
      darkgrayHover: string;

      border: string;
      naturalBorder: string;
      darkBorder: string;

      contentBackground: string;
      contentHover: string;
      text: string;
      textMuted: string;
      link: string;
      linkHover: string;
      comment: string;
      gold: string;

      error: string;
      success: string;
      warning: string;

      disabled: string;
      disabledText: string;

      overlay: string;
    };
  }
}
export const theme = {
  colors: {
    // Reddit 공식 색상
    primary: '#FF4500', // Reddit 오렌지
    primaryDark: '#D93A00', // Reddit 오렌지 (hover)
    primaryDarkHover: '#AE2C00', // Reddit 오렌지 (hover)

    secondaryLight: '#0060DF', // Reddit 블루 (hover)
    secondary: '#0A449B', // Reddit 블루
    secondaryDark: '#0A2F6C', // Reddit 블루 (hover)

    upvote: '#FF4500', // 투표 화살표 색상
    downvote: '#7193FF', // 투표 화살표 색상

    white: '#FFFFFF',
    dark: '#000000ba',
    background: '#FFFFFF',

    grayBackground: '#E5EBEE', // 회색 배경
    grayHover: '#DBE4E9', // 회색 배경 hover

    darkgrayBackground: '#ABB3B8', // 어두운 회색
    darkgrayHover: '#878E91', // 어우둔 회색 hover

    border: '#EDEFF1', // 경계선
    naturalBorder: '#00000033', // 자연스러운 경계선
    darkBorder: '#0000006f', // 어두운 경계선

    contentBackground: '#FFFFFF', // 카드/포스트 등 하얀색 배경
    contentHover: '#EEF1F3', // 카드/포스트 등 하얀색 배경 hover

    text: '#1A1A1B', // 기본 텍스트
    textMuted: '#878A8C', // 서브 텍스트

    link: '#0079D3', // 링크
    linkHover: '#005999', // 링크 hover

    comment: '#F6F7F8', // 댓글 배경

    gold: '#FFD635', // 골드(어워드)

    // 추가 색상
    error: '#FF585B', // 에러/경고
    success: '#46D160',
    warning: '#FFB000',

    disabled: '#F3F3F3',
    disabledText: '#B7B7B7',
    // 기타

    overlay: 'rgb(0 0 0/1)',
  },
};
export type Theme = typeof theme;
