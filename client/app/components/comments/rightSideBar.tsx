'use client';

import Link from 'next/link';

import formatTime from '@/app/utils/formatTime';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import { Sub } from '@/app/types';

import IconBox from '../common/IconBox';
import BrowserIcon from '../svgs/BrowserIcon';
import CakeIcon from '../svgs/CakeIcon';

const CommentsRightSideBar = ({ sub }: { sub: Sub }) => {
  const { handleSubscribe } = useSubStore();

  return (
    <StyledRightSideBar>
      <RightSideBarWrapper>
        <ActionsSection>
          <SubLink href={`/r/${sub.slug}`}>{`r/${sub.title}`}</SubLink>
          <SubScribeButton
            $isSubscribed={sub.isSubscribed}
            onClick={() => handleSubscribe(sub)}
          >
            {sub.isSubscribed ? '가입됨' : '가입'}
          </SubScribeButton>
        </ActionsSection>
        <InfoSection>
          <Title>{sub.title}</Title>
          <Description>{sub.description}</Description>

          <Options>
            <CreatedAtOption>
              <IconBox icon={<CakeIcon />} width={16} height={16} />
              <span>{`생성일 : ${formatTime(sub.createdAt)}`}</span>
            </CreatedAtOption>

            <VisibiltiyOption>
              <IconBox icon={<BrowserIcon />} width={16} height={16} />
              <span>
                {sub.visibility === 'public'
                  ? '공개'
                  : sub.visibility === 'restricted'
                    ? '제한됨'
                    : '비공개'}
              </span>
            </VisibiltiyOption>
          </Options>
        </InfoSection>
      </RightSideBarWrapper>
    </StyledRightSideBar>
  );
};

const StyledRightSideBar = styled.aside`
  padding: var(--spacer-md) 0;
`;

const RightSideBarWrapper = styled.div`
  background: ${({ theme }) => theme.colors.neutral.backgroundContainer};
  border-radius: var(--radius-md);

  padding: var(--spacer-md) 0;
`;

const ActionsSection = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0 var(--spacer-md);
`;

const SubLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral.content};
  font: var(--font-18-20-bold);
  line-height: 1;
`;

const SubScribeButton = styled.button<{ $isSubscribed: boolean }>`
  font: var(--font-12-16-semibold);
  line-height: 1;

  background: ${({ $isSubscribed, theme }) =>
    $isSubscribed ? 'transparent' : theme.colors.primary.background};

  border: ${({ $isSubscribed, theme }) =>
    $isSubscribed
      ? `var(--line-sm) solid ${theme.colors.neutral.borderMedium}`
      : 'none'};

  color: ${({ $isSubscribed, theme }) =>
    $isSubscribed ? theme.colors.neutral.content : theme.colors.global.white};

  padding: var(--spacer-xs) var(--spacer-sm);

  &:hover {
    background: ${({ $isSubscribed, theme }) =>
      $isSubscribed ? 'transparent' : theme.colors.primary.backgroundHover};

    border: ${({ $isSubscribed, theme }) =>
      $isSubscribed
        ? `var(--line-sm) solid ${theme.colors.neutral.borderMedium}`
        : 'none'};
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 var(--spacer-md);
`;
const Title = styled.p`
  font: var(--font-14-20-semibold);

  margin-top: var(--spacer-xs);
`;
const Description = styled.p`
  font: var(--font-14-20-regular);
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;

  height: var(--rem-40);

  gap: var(--spacer-2xs);
  margin-top: var(--spacer-sm);
`;

const CreatedAtOption = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  font: var(--font-12-16-regular);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};

  > div {
    margin-inline-end: var(--spacer-2xs);
  }

  > span {
    line-height: 1.5;
  }
`;

const VisibiltiyOption = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  font: var(--font-12-16-regular);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};

  > div {
    margin-inline-end: var(--spacer-2xs);
  }

  > span {
    line-height: 1.5;
  }
`;
export default CommentsRightSideBar;
