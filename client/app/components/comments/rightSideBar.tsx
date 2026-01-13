'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import formatTime from '@/app/utils/formatTime';

import { useAuthStore } from '@/app/store/authStore';
import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import { Sub } from '@/app/types';

import IconBox from '../common/IconBox';
import BrowserIcon from '../svgs/BrowserIcon';
import CakeIcon from '../svgs/CakeIcon';

const CommentsRightSideBar = ({ sub: initialSub }: { sub: Sub }) => {
  const router = useRouter();
  const [sub, setSub] = useState<Sub>(initialSub);

  const { user } = useAuthStore();
  const { subs, handleSubscribe } = useSubStore();

  const onHandleSubscribe = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    await handleSubscribe(sub);

    setSub({
      ...sub,
      isSubscribed: !sub.isSubscribed,
      subscriberCount: sub.isSubscribed
        ? sub.subscriberCount - 1
        : sub.subscriberCount + 1,
    });
  };

  useEffect(() => {
    if (!user) {
      setSub({ ...initialSub, isSubscribed: false });
      return;
    }

    setSub({ ...initialSub });
  }, [user, subs, initialSub]);

  return (
    <StyledRightSideBar>
      <RightSideBarWrapper>
        <ActionsSection>
          <SubLink href={`/r/${sub.slug}`}>{`r/${sub.title}`}</SubLink>
          <SubScribeButton
            $isSubscribed={sub.isSubscribed}
            onClick={onHandleSubscribe}
          >
            {sub.isSubscribed ? '가입됨' : '가입'}
          </SubScribeButton>
        </ActionsSection>
        <TopSection>
          <Title>{sub.title}</Title>
          <Description>{sub.description}</Description>

          <Infos>
            <InfoItem>
              <IconBox icon={<CakeIcon />} width={16} height={16} />
              <span>{`생성일 : ${formatTime(sub.createdAt)}`}</span>
            </InfoItem>

            <InfoItem>
              <IconBox icon={<BrowserIcon />} width={16} height={16} />
              <span>
                {sub.visibility === 'public'
                  ? '공개'
                  : sub.visibility === 'restricted'
                    ? '제한됨'
                    : '비공개'}
              </span>
            </InfoItem>

            <CountInfosRows>
              <CountInfosRowItem>
                <span>{sub.subscriberCount}</span>
                <span>subscriber</span>
              </CountInfosRowItem>

              <CountInfosRowItem>
                <span>{sub.postCount}</span>
                <span>post</span>
              </CountInfosRowItem>
            </CountInfosRows>
          </Infos>
        </TopSection>

        <RuleSection></RuleSection>
      </RightSideBarWrapper>
    </StyledRightSideBar>
  );
};

const StyledRightSideBar = styled.aside`
  padding: var(--spacer-md) 0;
`;

const RightSideBarWrapper = styled.div`
  padding: var(--spacer-md) 0;

  background: ${({ theme }) => theme.colors.neutral.backgroundContainer};
  border-radius: var(--radius-md);
`;

const ActionsSection = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0 var(--spacer-md);
`;

const SubLink = styled(Link)`
  display: flex;
  align-items: center;

  font: var(--font-18-20-bold);
  line-height: 1;
  color: ${({ theme }) => theme.colors.neutral.content};
`;

const SubScribeButton = styled.button<{ $isSubscribed: boolean }>`
  padding: var(--spacer-xs) var(--spacer-sm);

  font: var(--font-12-16-semibold);
  line-height: 1;
  color: ${({ $isSubscribed, theme }) =>
    $isSubscribed ? theme.colors.neutral.content : theme.colors.global.white};

  background: ${({ $isSubscribed, theme }) =>
    $isSubscribed ? 'transparent' : theme.colors.primary.background};
  border: ${({ $isSubscribed, theme }) =>
    $isSubscribed
      ? `var(--line-sm) solid ${theme.colors.neutral.borderMedium}`
      : 'none'};

  &:hover {
    background: ${({ $isSubscribed, theme }) =>
      $isSubscribed ? 'transparent' : theme.colors.primary.backgroundHover};
    border: ${({ $isSubscribed, theme }) =>
      $isSubscribed
        ? `var(--line-sm) solid ${theme.colors.neutral.borderMedium}`
        : 'none'};
  }
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 var(--spacer-md);
`;

const Title = styled.p`
  margin-top: var(--spacer-xs);

  font: var(--font-14-20-semibold);
`;

const Description = styled.p`
  font: var(--font-14-20-regular);
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-2xs);

  margin-top: var(--spacer-sm);
`;

const InfoItem = styled.div`
  display: flex;
  flex: 1;
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

const CountInfosRows = styled.div`
  display: flex;

  margin-top: var(--spacer-xs);
`;

const CountInfosRowItem = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  > span:first-child {
    font: var(--font-14-20-bold);
    color: ${({ theme }) => theme.colors.neutral.content};
  }

  > span:last-child {
    font: var(--font-12-16-regular);
    color: ${({ theme }) => theme.colors.neutral.contentWeak};
  }
`;

const RuleSection = styled.div``;

export default CommentsRightSideBar;
