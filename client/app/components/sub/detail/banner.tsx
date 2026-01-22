'use client';

import Image from 'next/image';

import styled from 'styled-components';

import PencilIcon from '@/app/components/svgs/PencilIcon';

import { Sub } from '@/app/types';

interface BannerProps {
  sub: Sub;
  bannerImage: string;
  onEditClick: () => void;
  isBanner: boolean;
}

const SubBanner = ({
  sub,
  bannerImage,
  onEditClick,
  isBanner,
}: BannerProps) => {
  return (
    <StyledSubBanner $isBanner={isBanner}>
      <BannerBox>
        {isBanner && (
          <Image
            src={bannerImage}
            alt={sub.title}
            fill
            sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
          />
        )}
      </BannerBox>
      <EditIcon onClick={onEditClick}>
        <PencilIcon />
      </EditIcon>
    </StyledSubBanner>
  );
};

const StyledSubBanner = styled.section<{ $isBanner: boolean }>`
  position: relative;

  height: ${({ $isBanner }) =>
    $isBanner ? 'var(--rem-128)' : 'var(--rem-64)'};
`;

const BannerBox = styled.div`
  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.colors.neutral.content};
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;

  > img {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }

  @media (min-width: 768px) {
    border-radius: var(--radius-md);

    > img {
      border-radius: var(--radius-md);
    }
  }
`;

const EditIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 0;
  bottom: 0;

  width: var(--rem-32);
  height: var(--rem-32);

  margin-right: var(--spacer-sm);
  margin-bottom: var(--spacer-sm);

  background: ${({ theme }) => theme.colors.neutral.background};
  border-radius: var(--radius-full);

  cursor: pointer;

  mix-blend-mode: normal;

  z-index: 10;

  &:hover {
    opacity: 1;

    filter: brightness(0.7);
  }
`;

export default SubBanner;
