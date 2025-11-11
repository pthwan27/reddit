import Image from 'next/image';

import styled from 'styled-components';

interface IconBoxProps {
  iconUrl: string | null;
  altText: string;
  width: number;
  height: number;
  percentage?: number;
}
const IconBox = ({
  iconUrl,
  altText,
  width,
  height,
  percentage = 100,
}: IconBoxProps) => {
  return (
    <StyledIconBox
      $isIcon={!!iconUrl}
      $width={width}
      $height={height}
      $percentage={percentage}
    >
      {iconUrl && <Image src={iconUrl} alt={altText} fill />}
    </StyledIconBox>
  );
};

const StyledIconBox = styled.div<{
  $isIcon?: boolean;
  $width: number;
  $height: number;
  $percentage: number;
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
  background: ${({ $isIcon, theme }) =>
    $isIcon ? 'transparent' : theme.colors.neutral.content};
  overflow: hidden;

  img {
    width: ${({ $percentage }) => `${$percentage}%`};
    height: ${({ $percentage }) => `${$percentage}%`};

    border-radius: var(--radius-full);
    object-fit: cover;
    background: transparent;
  }
`;

export default IconBox;
