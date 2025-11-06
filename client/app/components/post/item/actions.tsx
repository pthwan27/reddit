import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import { Post } from '@/app/types';

import CommentIcon from '../../svgs/CommentIcon';
import VoteDownIcon from '../../svgs/VoteDownIcon';
import VoteUpIcon from '../../svgs/VoteUpIcon';

const PostActions = ({ ...post }: Post) => {
  const { vote } = usePostStore();

  const voteHandler = (value: number) => {
    vote(post.identifier, post.slug, value);
  };
  return (
    <StyledPostActions>
      <VoteButtons
        $userVote={post.userVote === 1 ? 1 : post.userVote === -1 ? -1 : 0}
      >
        <button onClick={() => voteHandler(1)}>
          <VoteUpIcon />
        </button>
        <span>{post.voteScore || 0}</span>
        <button onClick={() => voteHandler(-1)}>
          <VoteDownIcon />
        </button>
      </VoteButtons>

      <CommentButton>
        <CommentIcon />
        {post.commentCount || 0}
      </CommentButton>
    </StyledPostActions>
  );
};
const StyledPostActions = styled.section`
  display: flex;

  gap: var(--spacer-xs);

  height: var(--rem-32);

  font: var(--font-12-16-semibold);
`;

const VoteButtons = styled.div<{ $userVote: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--spacer-2xs) 0;
  gap: var(--spacer-4xs);

  border-radius: var(--radius-xl);

  background: ${({ $userVote, theme }) =>
    $userVote === 1
      ? theme.colors.upvote.background
      : $userVote === -1
        ? theme.colors.downvote.background
        : theme.colors.secondary.background};

  span {
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ $userVote, theme }) =>
      $userVote === 1
        ? theme.colors.global.white
        : $userVote === -1
          ? theme.colors.global.white
          : theme.colors.global.black};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    padding: 0;

    height: var(--rem-32);
    width: var(--rem-32);

    border-radius: var(--radius-full);

    background: ${({ $userVote, theme }) =>
      $userVote === 1
        ? theme.colors.upvote.background
        : $userVote === -1
          ? theme.colors.downvote.background
          : theme.colors.secondary.background};

    &:hover {
      background: ${({ $userVote, theme }) =>
        $userVote === 1
          ? theme.colors.upvote.backgroundHover
          : $userVote === -1
            ? theme.colors.downvote.backgroundHover
            : theme.colors.secondary.background};
    }

    svg {
      border-radius: var(--radius-full);
      fill: ${({ $userVote, theme }) =>
        $userVote === 1
          ? theme.colors.upvote.onBackground
          : $userVote === -1
            ? theme.colors.downvote.onBackground
            : theme.colors.secondary.onBackground};
    }

    svg:nth-child(1) {
      &:hover {
        fill: ${({ theme }) => theme.colors.upvote.background};
      }
    }
    svg:nth-child(2) {
      &:hover {
        fill: ${({ theme }) => theme.colors.downvote.background};
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

  border-radius: var(--radius-xl);

  svg {
    height: var(--rem-16);
    width: var(--rem-16);
  }

  border: none;
  background: ${({ theme }) => theme.colors.secondary.background};

  &:hover {
    border: none;
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }
`;
export default PostActions;
