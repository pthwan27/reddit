'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useRecentPostsStore } from '@/app/store/recentPostsStore';

import styled from 'styled-components';

import { Sub, User } from '@/app/types';

import IconBox from '../common/IconBox';
import CommunityFill from '../svgs/CommunityFill';
import RecentPostInfos from './recentPostItem/infos';
import RecentPostPreview from './recentPostItem/preview';

const HomeRightSideBar = ({
  user,
  popularSubs,
}: {
  user: User | null;
  popularSubs: Sub[];
}) => {
  const { getRecentPosts, clearRecentPosts } = useRecentPostsStore();
  const [expanded, setExpanded] = useState(false);

  const DEFAULT_VISIBLE = 5;
  const visibleCount = expanded ? popularSubs.length : DEFAULT_VISIBLE;
  const shouldShowToggle = popularSubs.length > DEFAULT_VISIBLE;

  const clearRecentPostsHandler = () => {
    clearRecentPosts();
  };

  return (
    <StyledRightSideBar>
      <RightSideBarWrapper>
        {!user ? (
          <RightSideBarContainer>
            <TopSection>
              <Title>인기 커뮤니티</Title>
            </TopSection>
            <PopularSubsWrapper>
              {popularSubs.slice(0, visibleCount).map((sub) => (
                <PopularSubItemContainer key={sub.id}>
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
                </PopularSubItemContainer>
              ))}
            </PopularSubsWrapper>

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
          </RightSideBarContainer>
        ) : (
          getRecentPosts(user?.id || '').length > 0 && (
            <RightSideBarContainer>
              <TopSection>
                <Title>최근 본 게시물</Title>
                <ClearButton onClick={clearRecentPostsHandler}>
                  지우기
                </ClearButton>
              </TopSection>
              {getRecentPosts(user?.id || '').length > 0 &&
                getRecentPosts(user?.id || '').map((post, idx) => {
                  return (
                    <RecentPostItemContainer key={post.identifier + idx}>
                      <RecentPostItemTop>
                        <Content>
                          <RecentPostInfos post={post} />
                          <Body>{post.title}</Body>
                        </Content>

                        {post.postType !== 'text' && (
                          <Preview>
                            <RecentPostPreview
                              postType={post.postType}
                              linkUrl={post.linkUrl}
                              mediaType={post.mediaType}
                              imageUrls={post.imageUrls}
                              videoUrl={post.videoUrl}
                            />
                          </Preview>
                        )}
                      </RecentPostItemTop>
                      <RecentPostItemBottom>
                        <span>{`좋아요 ${post.voteScore}개`}</span>
                        <span>·</span>
                        <span>{`댓글 ${post.commentCount}개`}</span>
                      </RecentPostItemBottom>
                    </RecentPostItemContainer>
                  );
                })}
            </RightSideBarContainer>
          )
        )}
      </RightSideBarWrapper>
    </StyledRightSideBar>
  );
};

const StyledRightSideBar = styled.aside`
  padding: var(--spacer-xs) 0;
`;

const RightSideBarWrapper = styled.div`
  background: ${({ theme }) => theme.colors.neutral.backgroundContainer};
  border-radius: var(--radius-md);
`;

const RightSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacer-xs) 0 var(--spacer-2xs) 0;
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--rem-48);
  margin: 0 var(--spacer-md);
`;

const Title = styled.span`
  font: var(--font-12-16-semibold);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
`;

const ClearButton = styled.button`
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.default.primary};
  font: var(--font-14-20-regular);

  &:hover {
    color: ${({ theme }) => theme.colors.primary.plainHover};
  }
`;

const PopularSubsWrapper = styled.ul`
  margin: var(--spacer-xs) var(--spacer-md) 0;
`;

const PopularSubItemContainer = styled.li`
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

  margin: 0 var(--spacer-md) var(--spacer-md);
`;

const ToggleButton = styled.button`
  padding: var(--spacer-2xs) var(--spacer-xs);
  background: transparent;
  border-radius: var(--radius-sm);
  color: ${({ theme }) => theme.components.button.plain.text.default};
  font: var(--font-12-16-semibold);
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }
`;

const RecentPostItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacer-md) var(--spacer-sm);
  margin-bottom: var(--spacer-sm);
  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.neutral.borderWeak};
`;

const RecentPostItemTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div``;

const Body = styled.div`
  margin: var(--spacer-2xs) 0 var(--spacer-xs) 0;
  overflow: hidden;
  white-space: wrap;
  webkit-line-clamp: 2;
  font: var(--font-14-20-semibold);
  line-height: 1.25rem;
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
  cursor: pointer;

  &:hover {
    text-decoration-line: underline;
  }
`;

const Preview = styled.div``;

const RecentPostItemBottom = styled.div`
  display: flex;
  gap: var(--spacer-xs);
  margin-top: var(--spacer-2xs);
  font: var(--font-12-16-regular);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
`;

export default HomeRightSideBar;
