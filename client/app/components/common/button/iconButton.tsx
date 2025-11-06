import { ButtonHTMLAttributes, ReactNode } from 'react';

import styled, { DefaultTheme, css } from 'styled-components';

type ButtonVariant = 'neutral' | 'primary' | 'outlined';
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  value?: string;
  variant?: ButtonVariant;
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
  variant = 'neutral',
  font = '14',
  fontColor,
  width = 'auto',
  height = 'auto',
  radius,
  justifyContent,
  ...rest
}: IconButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
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

const getVariantStyles = (
  variant: ButtonVariant,
  theme: DefaultTheme,
  fontColor?: string
) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: ${theme.colors.primary.background};
        color: ${fontColor || theme.colors.primary.onBackground};
        border: transparent;

        &:hover {
          background-color: ${theme.colors.primary.backgroundHover};
          border: transparent;
        }
      `;
    case 'outlined':
      return css`
        background-color: transparent;
        color: ${fontColor || theme.colors.secondary.plain};
        border: var(--line-sm) solid ${theme.components.button.border.default};

        &:hover {
          border-color: ${theme.components.button.border.hover};
        }
      `;
    case 'neutral':
    default:
      return css`
        background-color: ${theme.colors.neutral.background};
        color: ${fontColor || theme.colors.neutral.contentStrong};
        border: none;

        &:hover {
          border: none;
          background-color: ${theme.colors.neutral.backgroundHover};
        }
      `;
  }
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
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
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;

  height: ${({ $height }) => $height || 'auto'};
  width: ${({ $width }) => $width || 'auto'};
  border-radius: ${({ $radius }) => $radius || 'var(--radius-md)'};
  font: ${({ $font }) => `var(--font-${$font})`};

  /* 5. variant에 따라 스타일을 동적으로 적용합니다. */
  ${({ $variant, theme, $fontColor }) =>
    getVariantStyles($variant, theme, $fontColor)}

  &:disabled {
    background: ${({ theme }) => theme.colors.interactive.backgroundDisabled};
    color: ${({ theme }) => theme.colors.interactive.contentDisabled};
    border-color: transparent;
    cursor: not-allowed;
  }

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
