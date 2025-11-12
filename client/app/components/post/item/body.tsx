import styled from 'styled-components';

import { Post } from '@/app/types';

const PostBody = ({ title, body }: Post) => {
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

  margin-bottom: var(--spacer-xs);

  font: var(--font-24-semibold);
`;

const Content = styled.div`
  padding-bottom: var(--spacer-2xs);

  font: var(--font-14-20-regular);
`;

export default PostBody;
