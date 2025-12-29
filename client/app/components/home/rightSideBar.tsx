'use client';

import Link from 'next/link';
import { useState } from 'react';

import styled from 'styled-components';

import { Sub, User } from '@/app/types';

import IconBox from '../common/IconBox';
import CommunityFill from '../svgs/CommunityFill';

const HomeRightSideBar = ({
  user,
  popularSubs,
}: {
  user: User | null;
  popularSubs: Sub[];
}) => {
  const [expanded, setExpanded] = useState(false);

  const DEFAULT_VISIBLE = 5;
  const visibleCount = expanded ? popularSubs.length : DEFAULT_VISIBLE;
  const shouldShowToggle = popularSubs.length > DEFAULT_VISIBLE;

  return (
    <StyledRightSideBar>
      <RightSideBarWrapper>
        {!user ? (
          <LoggedOutContainer>
            <Title>인기 커뮤니티</Title>
            <PopularSubsContainer>
              {popularSubs.slice(0, visibleCount).map((sub) => (
                <PopularSubItemWrapper key={sub.id}>
                  <PopularSubItem href={`/r/${sub.slug}`}>
                    {sub.iconUrl ? (
                      <IconBox
                        iconUrl={sub.iconUrl}
                        altText={sub.title}
                        width={32}
                        height={32}
                      />
                    ) : (
                      <IconBox
                        icon={<CommunityFill />}
                        altText={sub.title}
                        width={32}
                        height={32}
                      />
                    )}

                    <Info>
                      <span>{'r/' + sub.title}</span>
                      <span>{'멤버 ' + sub.subscriberCount}명</span>
                    </Info>
                  </PopularSubItem>
                </PopularSubItemWrapper>
              ))}
            </PopularSubsContainer>

            {shouldShowToggle && (
              <ToggleWrapper>
                <ToggleButton
                  type="button"
                  onClick={() => setExpanded((s) => !s)}
                  aria-expanded={expanded}
                >
                  {expanded ? '적게 보기' : `더보기`}
                </ToggleButton>
              </ToggleWrapper>
            )}
          </LoggedOutContainer>
        ) : (
          <LoggedInContainer></LoggedInContainer>
        )}
      </RightSideBarWrapper>
    </StyledRightSideBar>
  );
};

const StyledRightSideBar = styled.aside`
  padding: var(--spacer-xs) 0;
`;

const RightSideBarWrapper = styled.div`
  padding: 0 var(--spacer-md);
  background: ${({ theme }) => theme.colors.neutral.backgroundContainer};

  border-radius: var(--radius-md);

  @media (min-width: 768px) {
  }
`;

const LoggedOutContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: var(--spacer-xs) 0 var(--spacer-2xs) 0;
`;

const Title = styled.span`
  margin-bottom: var(--spacer-sm);

  font: var(--font-12-16-semibold);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
`;

const PopularSubsContainer = styled.ul`
  margin-top: var(--spacer-md);
`;

const PopularSubItemWrapper = styled.li`
  display: flex;
  align-items: flex-start;

  height: var(--rem-56);
`;

const PopularSubItem = styled(Link)`
  display: flex;
  align-items: center;

  gap: var(--spacer-xs);

  padding: var(--spacer-2xs) var(--spacer-md);

  height: var(--rem-48);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  > span:first-child {
    height: var(--rem-20);
    font: var(--font-14-20-regular);
    line-height: 1rem;
    color: ${({ theme }) => theme.colors.neutral.content};
  }

  > span:last-child {
    height: var(--rem-16);
    font: var(--font-12-16-regular);
    line-height: 1rem;
    color: ${({ theme }) => theme.colors.secondary.weak};
  }
`;

const ToggleWrapper = styled.div`
  display: flex;

  margin-bottom: var(--spacer-md);
`;

const ToggleButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.components.button.plain.text.default};

  font: var(--font-12-16-semibold);
  cursor: pointer;
  padding: var(--spacer-2xs) var(--spacer-xs);
  border-radius: var(--radius-sm);

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }
`;

const LoggedInContainer = styled.div``;
export default HomeRightSideBar;
