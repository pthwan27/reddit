import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import { Post } from '@/app/types';

import PostActions from './actions';
import PostInfos from './infos';

const PostItem = ({ post }: { post: Post }) => {
  const router = useRouter();

  const goToComments = () => {
    router.push(`/r/${post.sub.slug}/comments/${post.identifier}/${post.slug}`);
  };

  return (
    <StyledPostItem onClick={() => goToComments()}>
      <PostInfos {...post} />
      <TitleSection>{post.title}</TitleSection>
      <ContentSection>{post.body}</ContentSection>
      <PostActions {...post} />
    </StyledPostItem>
  );
};

const StyledPostItem = styled.div`
  border-radius: var(--radius-lg);

  margin: var(--spacer-2xs) 0;
  padding: var(--spacer-2xs) var(--spacer-md);
  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }

  cursor: pointer;
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: space-between;

  margin-bottom: var(--spacer-2xs);

  font: var(--font-18-20-semibold);
`;

const ContentSection = styled.section`
  margin-bottom: var(--spacer-xs);

  font: var(--font-14-20-regular);
`;

export default PostItem;
