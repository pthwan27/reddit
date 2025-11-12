import Image from 'next/image';
import { ReactNode } from 'react';

import styled, { DefaultTheme, css } from 'styled-components';

type BackgroundColor = 'neutral' | 'transparent' | 'secondary';
interface IconBoxProps {
  iconUrl?: string | null;
  icon?: ReactNode;
  altText?: string;
  width: number;
  height: number;
  percentage?: number;
  backgroundColor?: BackgroundColor;
}
const IconBox = ({
  iconUrl,
  icon,
  altText = 'icon alt',
  width,
  height,
  percentage = 100,
  backgroundColor = 'neutral',
}: IconBoxProps) => {
  return (
    <StyledIconBox
      $isIcon={!!iconUrl}
      $width={width}
      $height={height}
      $percentage={percentage}
      $backgroundColor={backgroundColor}
    >
      {iconUrl && <Image src={iconUrl} alt={altText} fill />}
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
      `;
    case 'neutral':
    default:
      return css`
        background: ${theme.colors.neutral.contentWeak};
      `;
  }
};

const StyledIconBox = styled.div<{
  $isIcon?: boolean;
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
