import { useCommentStore } from '@/app/store/commentStore';

import styled from 'styled-components';

import { Comment } from '@/app/types';

import CommentIcon from '../svgs/CommentIcon';
import DownVoteIcon from '../svgs/DownVote';
import DownVoteFillIcon from '../svgs/DownVoteFill';
import UpVoteFillIcon from '../svgs/UpVoteFillIcon';
import UpVoteIcon from '../svgs/UpVoteIcon';

interface CommentActionsProps {
  comment: Comment;
  setIsEditorOpen: () => void;
}
const CommentActions = ({ comment, setIsEditorOpen }: CommentActionsProps) => {
  const { vote } = useCommentStore();

  const voteHandler = (e: React.MouseEvent, value: number) => {
    e.stopPropagation();
    vote(comment.id, value, 'comment');
  };

  return (
    <StyledCommentActions>
      <VoteButtons
        $userVote={
          comment.userVote === 1 ? 1 : comment.userVote === -1 ? -1 : 0
        }
      >
        <UpvoteButton
          onClick={(e) => voteHandler(e, 1)}
          $isActive={comment.userVote === 1}
        >
          {comment.userVote === 1 ? <UpVoteFillIcon /> : <UpVoteIcon />}
        </UpvoteButton>
        <span>{comment.voteScore || 0}</span>
        <DownvoteButton
          onClick={(e) => voteHandler(e, -1)}
          $isActive={comment.userVote === -1}
        >
          {comment.userVote === -1 ? <DownVoteFillIcon /> : <DownVoteIcon />}
        </DownvoteButton>
      </VoteButtons>

      <CommentButton onClick={setIsEditorOpen}>
        <CommentIcon />
        <span>답글 달기</span>
      </CommentButton>
    </StyledCommentActions>
  );
};
const StyledCommentActions = styled.section`
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

  border-radius: var(--radius-xl);

  span {
    min-width: var(--rem-8);
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.components.button.plain.text.weak};
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

    &:hover {
      background: ${({ theme }) =>
        theme.components.button.plain.background.hover};
    }
  }
`;

const UpvoteButton = styled.button<{ $isActive: boolean }>`
  > svg {
    fill: ${({ $isActive, theme }) =>
      $isActive
        ? theme.colors.upvote.background
        : theme.components.button.plain.text.weak};

    &:hover {
      fill: ${({ theme }) => theme.colors.upvote.background};
    }
  }
`;

const DownvoteButton = styled.button<{ $isActive: boolean }>`
  > svg {
    fill: ${({ $isActive, theme }) =>
      $isActive
        ? theme.colors.downvote.background
        : theme.components.button.plain.text.weak};

    &:hover {
      fill: ${({ theme }) => theme.colors.downvote.background};
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

  color: ${({ theme }) => theme.components.button.plain.text.weak};
  svg {
    fill: ${({ theme }) => theme.components.button.plain.text.weak};
    height: var(--rem-16);
    width: var(--rem-16);
  }

  &:hover {
    background: ${({ theme }) =>
      theme.components.button.plain.background.hover};

    color: ${({ theme }) => theme.components.button.plain.text.hover};

    svg {
      fill: ${({ theme }) => theme.components.button.plain.text.hover};
    }
  }
`;
export default CommentActions;
