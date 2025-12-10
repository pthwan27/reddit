import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import { Post } from '@/app/types';

import CommentIcon from '../../svgs/CommentIcon';
import DownVoteIcon from '../../svgs/DownVote';
import DownVoteFillIcon from '../../svgs/DownVoteFill';
import UpVoteFillIcon from '../../svgs/UpVoteFillIcon';
import UpVoteIcon from '../../svgs/UpVoteIcon';

const CommentPostActions = ({ ...post }: Post) => {
  const { vote } = usePostStore();

  const voteHandler = (e: React.MouseEvent, value: number) => {
    e.stopPropagation();
    vote(post.id, value, 'post');
  };

  return (
    <StyledPostActions>
      <VoteButtons
        $userVote={post.userVote === 1 ? 1 : post.userVote === -1 ? -1 : 0}
      >
        <button onClick={(e) => voteHandler(e, 1)}>
          {post.userVote === 1 ? <UpVoteFillIcon /> : <UpVoteIcon />}
        </button>
        <span>{post.voteScore || 0}</span>
        <button onClick={(e) => voteHandler(e, -1)}>
          {post.userVote === -1 ? <DownVoteFillIcon /> : <DownVoteIcon />}
        </button>
      </VoteButtons>

      <CommentButton>
        <CommentIcon />
        {post.commentCount || 0}
      </CommentButton>
    </StyledPostActions>
  );
};
const StyledPostActions = styled.span`
  display: flex;

  gap: var(--spacer-xs);

  height: var(--rem-48);

  font: var(--font-12-16-semibold);

  padding: var(--spacer-md) var(--spacer-md) var(--spacer-2xs);

  @media (min-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const VoteButtons = styled.div<{ $userVote: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--spacer-2xs) 0;

  height: var(--rem-32);

  border-radius: var(--radius-xl);

  background: ${({ $userVote, theme }) =>
    $userVote === 1
      ? theme.colors.upvote.background
      : $userVote === -1
        ? theme.colors.downvote.background
        : theme.colors.secondary.background};

  span {
    min-width: var(--rem-8);
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
  }

  ${({ $userVote, theme }) =>
    $userVote === 0 &&
    `
    button:nth-child(1) {
    svg {
      &:hover {
        fill: ${theme.colors.upvote.background};
      }
    }
  }

  button:nth-child(3) {
    svg {
      &:hover {
        fill: ${theme.colors.downvote.background};
      }
    }
  }`}
`;

const CommentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: var(--spacer-2xs) var(--spacer-xs);
  height: var(--rem-32);

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
export default CommentPostActions;
