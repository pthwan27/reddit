import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import { Sub } from '@/app/types';

import IconButton from '../../common/button/iconButton';
import EtcIcon from '../../svgs/EtcIcon';
import PencilIcon from '../../svgs/PencilIcon';
import PlusIcon from '../../svgs/PlusIcon';

interface InfoProps {
  sub: Sub;
  iconImage: string;
  onEditClick: () => void;
  isIcon?: boolean;
}

const SubInfos = ({ sub, iconImage, onEditClick, isIcon }: InfoProps) => {
  const router = useRouter();

  const goToCreatePost = () => {
    router.push(`/r/${sub.title}/submit`);
  };
  return (
    <HeaderBottomSection>
      <ActionsBar>
        <TitleInfo>
          <IconBox onClick={onEditClick} $isIcon={isIcon}>
            {isIcon ? (
              <Image src={iconImage} alt={sub.title} fill />
            ) : (
              <span></span>
            )}
            <EditOverlay>
              <PencilIcon />
            </EditOverlay>
          </IconBox>
          <SubInfoBox>
            <div>
              <Title>{sub.title}</Title>
              <Desc>1명</Desc>
            </div>
            <SubInfoChangeButton>
              <PencilIcon />
            </SubInfoChangeButton>
          </SubInfoBox>
        </TitleInfo>

        <Buttons>
          <IconButton
            icon={<PlusIcon />}
            value="게시물 만들기"
            isSolid={true}
            height="38px"
            onClick={() => goToCreatePost()}
          />
          <IconButton
            value="임시 버튼"
            isSolid={false}
            bgColor="secondaryLight"
            hoverColor="secondaryDark"
            fontColor="white"
            height="38px"
          />

          <IconButton
            icon={<EtcIcon />}
            isSolid={true}
            width="40px"
            height="40px"
          />
        </Buttons>
      </ActionsBar>
    </HeaderBottomSection>
  );
};

const HeaderBottomSection = styled.section`
  display: flex;

  position: relative;

  height: var(--rem-128);

  padding: 0 var(--spacer-sm);

  @media (min-width: 768px) {
    top: -2.25rem;
    margin-bottom: -2.25rem;
    height: var(--rem-88);
  }
`;

const ActionsBar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  flex-direction: column;

  width: 100%;
  gap: var(--spacer-sm);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

    gap: 0;
  }
`;

const TitleInfo = styled.span`
  position: relative;
  display: flex;

  width: 100%;

  h1 {
    @media (min-width: 768px) {
      font: var(--font-title-h1);
      line-height: 2.25rem;
    }
    font: var(--font-title-h3);
    line-height: 1.5rem;
  }

  gap: var(--spacer-sm);

  @media (min-width: 768px) {
    gap: var(--spacer-2xs);
    align-items: flex-end;
  }
`;

const IconBox = styled.div<{ $isIcon?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  width: var(--rem-48);
  height: var(--rem-48);

  flex-shrink: 0;
  aspect-ratio: 1 / 1;

  background-color: ${({ theme }) => theme.colors.background};
  border: var(--line-lg) solid ${({ theme }) => theme.colors.white};
  border-radius: var(--radius-full);

  cursor: pointer;

  img {
    width: 90%;
    height: 90%;
    border-radius: var(--radius-full);
  }

  span {
    width: 90%;
    height: 90%;
    border-radius: var(--radius-full);
    background-color: ${({ $isIcon, theme }) =>
      $isIcon ? 'transparent' : theme.colors.dark};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.darkgrayHover};

    img {
      filter: brightness(0.7);
    }

    > div {
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    width: var(--rem-88);
    height: var(--rem-88);
  }
`;
const EditOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  width: 100%;
  height: 100%;

  opacity: 0;
  transition: opacity 0.2s ease;

  mix-blend-mode: hard-light;

  svg {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

const SubInfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    gap: var(--spacer-2xs);
  }
`;
const Title = styled.h1``;

const Desc = styled.span`
  display: flex;
  @media (min-width: 768px) {
    display: none;
  }
`;
const SubInfoChangeButton = styled.button`
  @media (min-width: 768px) {
    display: none;
  }
`;

const Buttons = styled.span`
  display: flex;

  gap: var(--spacer-sm);
`;

export default SubInfos;
