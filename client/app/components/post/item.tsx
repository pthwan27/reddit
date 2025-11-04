import Image from 'next/image';

import formatTimeAgo from '@/app/utils/formatTimeAgo';

import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import { Post } from '@/app/types';

import CommentIcon from '../svgs/CommentIcon';
import EtcIcon from '../svgs/EtcIcon';
import VoteDownIcon from '../svgs/VoteDownIcon';
import VoteUpIcon from '../svgs/VoteUpIcon';

const PostItem = ({ post }: { post: Post }) => {
  const { vote } = usePostStore();

  const voteHandler = (value: number) => {
    vote(post.identifier, post.slug, value);
  };
  return (
    <StyledPostItem>
      <UserInfo>
        <div>
          <IconBox $isIcon={!!post.user.profileUrl}>
            {post.user.profileUrl && (
              <Image src={post.user.profileUrl} alt={post.user.username} fill />
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
      <>post.userVote : {post.userVote}</>
      <ActionsSection>
        <VoteButtons
          $userVote={post.userVote === 1 ? 1 : post.userVote === -1 ? -1 : 0}
        >
          <button onClick={() => voteHandler(1)}>
            <VoteUpIcon />
          </button>
          {post.voteScore || 0}
          <button onClick={() => voteHandler(-1)}>
            <VoteDownIcon />
          </button>
        </VoteButtons>

        <CommentButton>
          <CommentIcon />
          {post.commentCount || 0}
        </CommentButton>
      </ActionsSection>
    </StyledPostItem>
  );
};

const StyledPostItem = styled.div`
  postition: relative;
  margin: var(--spacer-2xs) 0;
  padding: var(--spacer-4xs) var(--spacer-md);
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutralHover};
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
      color: ${({ theme }) => theme.colors.neutralContentWeak};
    }

    svg {
      width: var(--rem-16);
      height: var(--rem-16);
      fill: ${({ theme }) => theme.colors.secondaryText};
    }
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

  font: var(--font-12-16-semibold);
`;

const VoteButtons = styled.div<{ $userVote: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--spacer-2xs) var(--spacer-xs);
  gap: var(--spacer-xs);

  border-radius: var(--radius-lg);

  background: ${({ $userVote, theme }) =>
    $userVote === 1
      ? theme.colors.upvote
      : $userVote === -1
        ? theme.colors.downvote
        : theme.colors.grayBackground};

  button {
    padding: 0;

    height: var(--rem-16);
    width: var(--rem-16);

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
`;

const CommentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--spacer-2xs) var(--spacer-xs);
  gap: var(--spacer-2xs);

  border-radius: var(--radius-lg);

  svg {
    height: var(--rem-16);
    width: var(--rem-16);
  }

  background: ${({ theme }) => theme.colors.grayBackground};

  &:hover {
    background: ${({ theme }) => theme.colors.grayHoverDark};
  }
`;
export default PostItem;
