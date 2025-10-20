'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { useUploadImage } from '@/app/hooks/useUploadImage';

import styled from 'styled-components';

import IconButton from '@/app/components/common/button/iconButton';
import EtcIcon from '@/app/components/svgs/EtcIcon';
import PencilIcon from '@/app/components/svgs/PencilIcon';
import PlusIcon from '@/app/components/svgs/PlusIcon';

import { Sub } from '@/app/types';

const SubDetailContainer = ({ sub }: { sub: Sub }) => {
  const { uploadIconImage } = useUploadImage();
  const [iconImage, setIconImage] = useState<string>(sub.iconUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      try {
        const iconUrl = await uploadIconImage({ id: sub.id, icon: file });

        if (iconUrl) {
          setIconImage(iconUrl);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setIconImage(sub.iconUrl);
  }, [sub.iconUrl]);

  return (
    <StyledSubDetailContainer>
      <SubDetailHeader>
        <HeaderTopSection>
          <BannerBox>
            <Image src={sub.bannerUrl} alt={sub.title} fill />
          </BannerBox>
        </HeaderTopSection>

        <HeaderBottomSection>
          <ActionsBar>
            <TitleInfo>
              <IconBox onClick={handleClick}>
                <Image src={iconImage} alt={sub.title} width={32} height={32} />
                <EditOverlay>
                  <PencilIcon />
                </EditOverlay>
              </IconBox>
              <h1>{sub.title}</h1>
            </TitleInfo>

            <SubInfo>1명</SubInfo>
            <Buttons>
              <IconButton
                icon={<PlusIcon />}
                value="게시물 만들기"
                isSolid={true}
              />
              <IconButton
                value="게시물 만들기"
                isSolid={false}
                bgColor="secondaryLight"
                hoverColor="secondaryDark"
                fontColor="white"
              />

              <IconButton icon={<EtcIcon />} isSolid={true} />
            </Buttons>
          </ActionsBar>
        </HeaderBottomSection>
      </SubDetailHeader>
      <SubDetailMain></SubDetailMain>
      <SubDetailFooter></SubDetailFooter>

      <HiddenInput ref={fileInputRef} type="file" onChange={handleFileChange} />
    </StyledSubDetailContainer>
  );
};

const StyledSubDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  max-width: calc(100vw - 272px, 0px));
  
  margin : 0 auto;
  @media (min-width: 1200px) {
    width: 1120px;
  }
`;

const SubDetailHeader = styled.header`
  width: 100%;

  @media (min-width: 768px) {
    margin-top: 0.5rem;
  }
`;
const HeaderTopSection = styled.section``;

const BannerBox = styled.div`
  position: relative;

  width: 100%;
  height: var(--rem-64);

  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;

  border-radius: var(--radius-md);

  img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-md);
  }
`;
const HeaderBottomSection = styled.section`
  display: flex;

  padding: 0 var(--spacer-sm);
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TitleInfo = styled.span`
  display: flex;

  align-items: center;
  h1 {
    @media (min-width: 768px) {
      font: var(--font-title-h1);
      line-height: 2.25rem;
    }
    font: var(--font-title-h3);
    line-height: 1.5rem;
  }
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  margin-top: -1.8rem;

  width: 3rem;
  height: 3rem;

  background-color: ${({ theme }) => theme.colors.background};
  border: var(--line-lg) solid ${({ theme }) => theme.colors.white};
  border-radius: var(--radius-full);

  cursor: pointer;

  @media (min-width: 768px) {
    width: 88px;
    height: 88px;
  }

  img {
    width: 90%;
    height: 90%;
    border-radius: var(--radius-full);
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkgrayHover};

    img {
      filter: brightness(0.7); /* 이미지를 어둡게 만듭니다 */
    }

    > div {
      opacity: 1;
    }
  }
`;
const EditOverlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

const SubInfo = styled.div`
  display: flex;
  @media (min-width: 768px) {
    display: none;
  }
`;
const Buttons = styled.span`
  display: flex;

  gap: var(--spacer-sm);
`;

const SubDetailMain = styled.main`
  display: flex;
  width: 100%;
`;
const SubDetailFooter = styled.footer`
  width: 100%;
`;

const HiddenInput = styled.input`
  display: none;
`;
export default SubDetailContainer;
