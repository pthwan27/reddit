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
    <HeaderTopSection $isBanner={isBanner}>
      <BannerBox>
        {isBanner && <Image src={bannerImage} alt={sub.title} fill />}
      </BannerBox>
      <EditIcon onClick={onEditClick}>
        <PencilIcon />
      </EditIcon>
    </HeaderTopSection>
  );
};

const HeaderTopSection = styled.section<{ $isBanner: boolean }>`
  position: relative;

  height: ${({ $isBanner }) =>
    $isBanner ? 'var(--rem-128)' : 'var(--rem-64)'};
`;

const BannerBox = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.darkgrayBackground};

  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;

  img {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) {
    margin-top: 0.5rem;

    border-radius: var(--radius-md);

    img {
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

  margin-right: var(--spacer-sm);
  margin-bottom: var(--spacer-sm);

  width: var(--rem-32);
  height: var(--rem-32);

  border-radius: var(--radius-full);

  cursor: pointer;
  z-index: 10;

  background-color: ${({ theme }) => theme.colors.background};
  mix-blend-mode: normal;

  &:hover {
    filter: brightness(0.7); /* 이미지를 어둡게 만듭니다 */

    opacity: 1;
  }
`;
export default SubBanner;
