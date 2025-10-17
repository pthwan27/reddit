'use client';

import Image from 'next/image';

import styled from 'styled-components';

import IconButton from '@/app/components/common/button/iconButton';
import EtcIcon from '@/app/components/svgs/EtcIcon';
import PlusIcon from '@/app/components/svgs/PlusIcon';

import { Sub } from '@/app/types';

const SubDetailContainer = ({ sub }: { sub: Sub }) => {
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
              <IconBox>
                <Image
                  src={sub.iconUrl}
                  alt={sub.title}
                  width={32}
                  height={32}
                />
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
                icon={<PlusIcon />}
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
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;

  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TitleInfo = styled.span`
  display: flex;

  align-items: baseline;
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

  margin-top: -1rem;

  width: 3rem;
  height: 3rem;

  background-color: ${({ theme }) => theme.colors.background};

  @media (min-width: 768px) {
    width: 88px;
    height: 88px;
  }

  border-radius: var(--radius-full);

  img {
    width: 77%;
    height: 77%;
    border-radius: var(--radius-full);
  }
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

export default SubDetailContainer;
