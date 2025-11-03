import { ButtonHTMLAttributes, ReactNode } from 'react';

import styled from 'styled-components';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  value?: string;
  isSolid?: boolean;
  bgColor?: string;
  hoverColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  font?: string;
  fontColor?: string;
  width?: string;
  height?: string;
  radius?: string;

  justifyContent?: string;
}

const IconButton = ({
  icon,
  value,
  onClick,
  isSolid = false,
  bgColor,
  hoverColor,
  borderColor = 'darkBorder',
  hoverBorderColor = 'darkborder',
  font = '14',
  fontColor = 'text',
  width = 'auto',
  height = 'auto',
  radius,
  justifyContent,
  ...rest
}: IconButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      $isSolid={isSolid}
      $bgColor={bgColor}
      $hoverColor={hoverColor}
      $borderColor={borderColor}
      $hoverBorderColor={hoverBorderColor}
      $font={font}
      $fontColor={fontColor}
      $width={width}
      $height={height}
      $radius={radius}
      $justifyContent={justifyContent}
      {...rest}
    >
      {icon && <IconBox>{icon}</IconBox>}
      {value && <span>{value}</span>}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $isSolid?: boolean;
  $bgColor?: string;
  $hoverColor?: string;
  $borderColor?: string;
  $hoverBorderColor?: string;
  $font?: string;
  $fontColor?: string;
  $width?: string;
  $height?: string;
  $radius?: string;
  $justifyContent?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ $justifyContent }) => $justifyContent || ''};
  gap: var(--spacer-xs);
  padding: var(--spacer-2xs) var(--spacer-md);
  cursor: pointer;

  /* 높이 설정 */
  height: ${({ $height }) => $height || 'auto'};

  /* 넓이 설정 */
  width: ${({ $width }) => $width || 'auto'};

  /* 기본 폰트 색상*/
  color: ${({ theme, $fontColor }) =>
    $fontColor
      ? theme.colors[$fontColor as keyof typeof theme.colors]
      : theme.colors.text};

  /* 기본 테두리 스타일 */
  border: ${({ $isSolid, $borderColor, theme }) =>
    $isSolid
      ? `var(--line-sm) solid ${theme.colors[$borderColor as keyof typeof theme.colors] || theme.colors.darkBorder}`
      : 'none'};

  /* 테두리 반경 */
  border-radius: ${({ $radius }) => $radius || 'var(--radius-md)'};

  /* 기본 배경색 */
  background: ${({ $bgColor, theme }) => {
    if (!$bgColor) return 'transparent';
    return theme.colors[$bgColor as keyof typeof theme.colors] || 'transparent';
  }};

  /* 호버 스타일 */
  &:hover {
    /* 호버 배경색 */
    background: ${({ $hoverColor, theme }) => {
      if (!$hoverColor) return theme.colors.contentHover;
      return (
        theme.colors[$hoverColor as keyof typeof theme.colors] ||
        theme.colors.contentHover
      );
    }};

    /* 호버 테두리 */
    border: ${({ $isSolid, $hoverBorderColor, theme }) =>
      $isSolid
        ? `var(--line-sm) solid ${
            theme.colors[$hoverBorderColor as keyof typeof theme.colors] ||
            'transparent'
          }`
        : 'none'};
  }

  /* 비활성화 스타일 */
  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
    border-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }

  /* 글꼴 */
  font: ${({ $font }) => `var(--font-${$font})`};

  span {
    display: flex;
    line-height: 1.25rem;
    white-space: nowrap;
    height: var(--rem-20);
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: var(--rem-32);
  height: var(--rem-32);

  min-width: var(--rem-32);
  min-height: var(--rem-32);

  border-radius: var(--radius-full);
  overflow: hidden;

  svg {
    width: var(--rem-20);
    height: var(--rem-20);
    border-radius: var(--radius-full);
    object-fit: cover;
    background: transparent;
  }
`;

export default IconButton;
