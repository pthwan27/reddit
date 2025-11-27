import { styled } from 'styled-components';

import { Comment } from '@/app/types';

const CommentsByPost = ({ comments }: { comments: Comment[] }) => {
  return <CommentWrapper>{comments.length}</CommentWrapper>;
};

const CommentWrapper = styled.div`
  padding: 0 var(--spacer-md);

  @media (min-width: 768px) {
    padding: 0;
  }
`;
export default CommentsByPost;
