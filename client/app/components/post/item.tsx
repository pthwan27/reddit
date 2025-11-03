import Image from 'next/image';

import formatTimeAgo from '@/app/utils/formatTimeAgo';

import styled from 'styled-components';

import { Post } from '@/app/types';

import CommentIcon from '../svgs/CommentIcon';
import EtcIcon from '../svgs/EtcIcon';
import VoteDownIcon from '../svgs/VoteDownIcon';
import VoteUpIcon from '../svgs/VoteUpIcon';

const PostItem = ({ post }: { post: Post }) => {
  return (
    <>
      <hr />
      <StyledPostItem>
        <UserInfo>
          <div>
            <IconBox $isIcon={!!post.user.profileUrl}>
              {post.user.profileUrl && (
                <Image
                  src={post.user.profileUrl}
                  alt={post.user.username}
                  fill
                />
              )}
            </IconBox>
            <span>u/{post.user.username}</span>
            <span>•</span>
            <span>{formatTimeAgo(post.createdAt)}</span>
          </div>
          <div>
            <EtcIcon />
          </div>
        </UserInfo>
        <TitleSection>{post.title}</TitleSection>

        <ContentSection>{post.body}</ContentSection>

        <ActionsSection>
          <button>
            <VoteUpIcon />
            {post.voteScore || 0}
            <VoteDownIcon />
          </button>

          <button>
            <CommentIcon />
            {post.commentCount || 0}
          </button>
        </ActionsSection>
      </StyledPostItem>
    </>
  );
};

const StyledPostItem = styled.div`
  border-radius: var(--radius-lg);
  padding: var(--spacer-2xs) var(--spacer-md);

  &:hover {
    background-color: ${({ theme }) => theme.colors.contentHover};
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: var(--spacer-xs);

  height: var(--rem-32);

  div {
    display: flex;
    align-items: center;

    gap: var(--spacer-2xs);

    font: var(--font-12-16-regular);

    cursor: pointer;

    span:nth-child(2) {
      font: var(--font-12-16-bold);

      color: ${({ theme }) => theme.colors.secondaryText};
    }

    span:nth-child(3),
    span:nth-child(4) {
      color: ${({ theme }) => theme.colors.grayText};
    }


    svg{
    width: var(--rem-16);
    height: var(--rem-16);
    fill : ${({ theme }) => theme.colors.secondaryText};
  }
`;

const IconBox = styled.div<{ $isIcon?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: var(--rem-24);
  height: var(--rem-24);

  min-width: var(--rem-24);
  min-height: var(--rem-24);

  border-radius: var(--radius-full);
  background-color: ${({ $isIcon, theme }) =>
    $isIcon ? 'transparent' : theme.colors.dark};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-full);
    object-fit: cover;

    background: transparent;
  }
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: space-between;

  margin-bottom: var(--spacer-xs);

  font: var(--font-18-20-semibold);
`;
const ContentSection = styled.section`
  margin-bottom: var(--spacer-md);

  font: var(--font-14-20-regular);
`;
const ActionsSection = styled.section`
  display: flex;

  gap: var(--spacer-xs);

  height: var(--rem-32);

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    background: ${({ theme }) => theme.colors.grayBackground};
  }

  button:nth-child(1) {
    gap: var(--spacer-2xs);
    svg:nth-child(1) {
      &:hover {
        fill: ${({ theme }) => theme.colors.upvote};
      }
    }
    svg:nth-child(2) {
      &:hover {
        fill: ${({ theme }) => theme.colors.downvote};
      }
    }
  }
  button:nth-child(2) {
    gap: var(--spacer-2xs);
    &:hover {
      background: ${({ theme }) => theme.colors.grayHover};
    }
  }
`;

export default PostItem;
