import styled from 'styled-components';

import { Post } from '@/app/types';

const CommentsByPostBody = ({ title, body }: Post) => {
  return (
    <>
      <Title>{title}</Title>
      <Content>{body}</Content>
    </>
  );
};

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  font: var(--font-24-semibold);

  padding: 0 var(--spacer-md);
  margin-bottom: var(--spacer-xs);

  @media (min-width: 768px) {
    padding: 0 0;
    margin-bottom: var(--spacer-md);
  }
`;

const Content = styled.div`
  font: var(--font-14-20-regular);

  padding: 0 var(--spacer-md);
  margin-bottom: var(--spacer-xs);

  @media (min-width: 768px) {
    padding: 0 0;
  }
`;

export default CommentsByPostBody;
