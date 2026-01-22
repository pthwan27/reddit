import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAuthStore } from '@/app/store/authStore';
import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import { Sub } from '@/app/types';

import IconButton from '../../common/button/iconButton';
import CommunityFill from '../../svgs/CommunityFill';
import EtcIcon from '../../svgs/EtcIcon';
import PencilIcon from '../../svgs/PencilIcon';
import PlusIcon from '../../svgs/PlusIcon';
import EtcDropdown from './etcDropdown';

interface InfoProps {
  sub: Sub;
  iconImage: string;
  onEditClick: () => void;
  isIcon?: boolean;
}

const SubInfos = ({ sub, iconImage, onEditClick, isIcon }: InfoProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useAuthStore();
  const { setSelectedSub, handleSubscribe } = useSubStore();

  const [isEtcOpen, setIsEtcOpen] = useState(false);

  const toggleEtcOpen = () => {
    setIsEtcOpen((prev) => !prev);
  };

  const goToCreatePost = () => {
    setSelectedSub(sub);
    router.push(`${pathname}/submit`);
  };

  const onHandleSubscribe = async (e: React.MouseEvent, sub: Sub) => {
    e.stopPropagation();

    if (sub.isOwner) return;

    await handleSubscribe(sub);
  };

  return (
    <StyledSubInfos>
      <ActionsBar>
        <TitleInfo>
          <IconBoxWrapper onClick={onEditClick} $isIcon={isIcon}>
            {isIcon ? (
              <SubIconWrapper>
                <Image
                  src={iconImage}
                  alt={sub.title}
                  fill
                  sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
                />
              </SubIconWrapper>
            ) : (
              <CommunityFill />
            )}
            <EditOverlay>
              <PencilIcon />
            </EditOverlay>
          </IconBoxWrapper>
          <SubInfoBox>
            <div>
              <Title>{'r/' + sub.title}</Title>
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
            radius="var(--radius-xl)"
            onClick={() => goToCreatePost()}
            variant="outlined"
            font="16-20-semibold"
          />

          {!user ? (
            <IconButton
              value="가입"
              fontColor="white"
              radius="var(--radius-xl)"
              variant="primary"
              font="16-20-semibold"
              onClick={(e) => onHandleSubscribe(e, sub)}
            />
          ) : sub.isSubscribed || sub.isOwner ? (
            <IconButton
              value="가입됨"
              radius="var(--radius-xl)"
              variant="outlined"
              font="16-20-semibold"
              disabled={sub.isOwner}
              onClick={(e) => onHandleSubscribe(e, sub)}
            />
          ) : (
            <IconButton
              value="가입"
              fontColor="white"
              radius="var(--radius-xl)"
              variant="primary"
              font="16-20-semibold"
              onClick={(e) => onHandleSubscribe(e, sub)}
            />
          )}

          <IconButton
            icon={<EtcIcon />}
            radius="var(--radius-xl)"
            width="40px"
            height="40px"
            justifyContent="center"
            variant="outlined"
            onClick={toggleEtcOpen}
          />

          <EtcDropdown
            isDropdownOpen={isEtcOpen}
            isOwner={sub.isOwner}
            isSubscribed={sub.isSubscribed}
            handleSubscribe={(e) => onHandleSubscribe(e, sub)}
          />
        </Buttons>
      </ActionsBar>
    </StyledSubInfos>
  );
};

const StyledSubInfos = styled.section`
  display: flex;

  position: relative;

  height: var(--rem-128);

  padding: 0 var(--spacer-md);

  @media (min-width: 768px) {
    top: -2rem;

    height: var(--rem-88);

    margin-bottom: -2.25rem;
  }
`;

const ActionsBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;

  width: 100%;

  gap: var(--spacer-sm);

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;

    gap: 0;
  }
`;

const TitleInfo = styled.span`
  display: flex;

  position: relative;

  width: 100%;

  gap: var(--spacer-sm);

  h1 {
    font: var(--font-title-h3);
    line-height: 1.5rem;

    @media (min-width: 768px) {
      font: var(--font-title-h1);
      line-height: 2.25rem;
    }
  }

  @media (min-width: 768px) {
    align-items: flex-end;

    gap: var(--spacer-2xs);
  }
`;

const IconBoxWrapper = styled.div<{ $isIcon?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  width: var(--rem-48);
  height: var(--rem-48);

  min-width: var(--rem-48);
  min-height: var(--rem-48);

  flex-shrink: 0;
  aspect-ratio: 1 / 1;

  background: ${({ theme }) => theme.colors.neutral.background};
  border-radius: var(--radius-full);

  cursor: pointer;

  > svg {
    width: 100%;
    height: 100%;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};

    > div {
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    width: var(--rem-88);
    height: var(--rem-88);
  }
`;

const SubIconWrapper = styled.div`
  position: relative;

  width: 90%;
  height: 90%;

  border-radius: var(--radius-full);

  overflow: hidden;
`;

const EditOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  width: 90%;
  height: 90%;

  background: ${({ theme }) => theme.colors.overlay.background};
  border-radius: var(--radius-full);

  mix-blend-mode: hard-light;

  opacity: 0;

  transition: opacity 0.2s ease;

  > svg {
    fill: ${({ theme }) => theme.colors.global.white};
  }
`;

const SubInfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  > div {
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

  height: var(--rem-40);

  gap: var(--spacer-sm);
`;

export default SubInfos;
