import styled from 'styled-components';

import { Comment } from '@/app/types';

import CommentItem from '../item';

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <StyledCommentList>
      <div />
      {comments.map((comment) => (
        <CommentItem {...comment} key={comment.identifier} />
      ))}
    </StyledCommentList>
  );
};

const StyledCommentList = styled.div`
  display: flex;
  flex-direction: column;

  gap: var(--spacer-md);
`;

export default CommentList;
