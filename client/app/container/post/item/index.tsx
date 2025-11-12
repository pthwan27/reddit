import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import { Post } from '@/app/types';

import PostActions from '../../../components/post/item/actions';
import PostBody from '../../../components/post/item/body';
import PostInfos from '../../../components/post/item/infos';

const PostItem = ({ post }: { post: Post }) => {
  const router = useRouter();

  const goToComments = () => {
    router.push(`/r/${post.sub.slug}/comments/${post.identifier}/${post.slug}`);
  };

  return (
    <StyledPostItem onClick={() => goToComments()}>
      <PostInfos {...post} />
      <PostBody {...post} />
      <PostActions {...post} />
    </StyledPostItem>
  );
};

const StyledPostItem = styled.div`
  padding: var(--spacer-2xs) var(--spacer-md);

  margin: var(--spacer-2xs) 0;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }

  cursor: pointer;

  @media (min-width: 768px) {
    border-radius: var(--radius-lg);
  }
`;

export default PostItem;
