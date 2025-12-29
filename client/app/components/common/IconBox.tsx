import Image from 'next/image';
import { ReactNode } from 'react';

import styled, { DefaultTheme, css } from 'styled-components';

type BackgroundColor = 'media' | 'neutral' | 'transparent' | 'secondary';
interface IconBoxProps {
  iconUrl?: string | null;
  icon?: ReactNode;
  altText?: string;
  width: number;
  height: number;
  percentage?: number;
  backgroundColor?: BackgroundColor;
  onClick?: (e: React.MouseEvent) => void;
}
const IconBox = ({
  iconUrl,
  icon,
  altText = 'icon alt',
  width,
  height,
  percentage = 100,
  backgroundColor = 'transparent',
  onClick,
  ...rest
}: IconBoxProps) => {
  return (
    <StyledIconBox
      $width={width}
      $height={height}
      $percentage={percentage}
      $backgroundColor={backgroundColor}
      onClick={onClick}
      {...rest}
    >
      {iconUrl && (
        <Image
          src={iconUrl}
          alt={altText}
          fill
          sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
        />
      )}
      {!iconUrl && icon}
    </StyledIconBox>
  );
};

const bgColor = (backgroundColor: BackgroundColor, theme: DefaultTheme) => {
  switch (backgroundColor) {
    case 'transparent':
      return css`
        background: transparent;
      `;
    case 'secondary':
      return css`
        background: ${theme.components.button.secondary.background.default};

        &:hover { 
          background: ${theme.components.button.secondary.background.hover};
      `;

    case 'media':
      return css`
        background: ${theme.colors.media.background};

        svg{ 
          fill: ${theme.colors.media.onBackground};
        }
          
        &:hover { 
          background: ${theme.colors.media.backgroundHover};

      `;
    case 'neutral':
    default:
      return css`
        background: ${theme.colors.neutral.background};
      `;
  }
};

const StyledIconBox = styled.div<{
  $width: number;
  $height: number;
  $percentage: number;
  $backgroundColor: BackgroundColor;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};

  min-width: ${({ $width }) => `${$width}px`};
  min-height: ${({ $height }) => `${$height}px`};

  border-radius: var(--radius-full);

  ${({ $backgroundColor, theme }) => bgColor($backgroundColor, theme)};

  overflow: hidden;

  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

  img {
    width: ${({ $percentage }) => `${$percentage}%`};
    height: ${({ $percentage }) => `${$percentage}%`};

    border-radius: var(--radius-full);
    object-fit: cover;
    background: transparent;
  }

  svg {
    width: ${({ $percentage }) => `${$percentage}%`};
    height: ${({ $percentage }) => `${$percentage}%`};
  }
`;

export default IconBox;
