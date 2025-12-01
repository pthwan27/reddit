import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import LinkPreview from '@/app/components/post/detail/linkPreview';

import { Post } from '@/app/types';

import PostActions from '../../../components/post/detail/actions';
import PostBody from '../../../components/post/detail/body';
import PostInfos from '../../../components/post/detail/infos';

const PostItem = ({ post }: { post: Post }) => {
  const router = useRouter();

  const goToComments = () => {
    router.push(`/r/${post.sub.slug}/comments/${post.identifier}/${post.slug}`);
  };

  if (post.postType === 'link') {
    return (
      <StyledPostLinkItem onClick={() => goToComments()}>
        <PostHeader>
          <PostInfos {...post} />
        </PostHeader>
        <PostContent>
          <PostBody {...post} />
        </PostContent>
        <PostLinkPreview>
          {post.linkUrl && <LinkPreview url={post.linkUrl} />}
        </PostLinkPreview>

        <PostActions {...post} />
      </StyledPostLinkItem>
    );
  }

  return (
    <StyledPostItem onClick={() => goToComments()}>
      <PostInfos {...post} />
      <PostBody {...post} />
      <PostActions {...post} />
    </StyledPostItem>
  );
};

const StyledPostLinkItem = styled.div`
  display: grid;

  grid-template-rows: auto auto auto;
  grid-template-columns: minmax(0, 1fr) min-content;

  column-gap: var(--spacer-2xs);

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

const PostHeader = styled.div`
  grid-row-start: 1;
  grid-row-end: 2;

  grid-column-start: 1;
  grid-column-end: 3;
`;
const PostContent = styled.div`
  grid-row-start: 2;
  grid-row-end: 3;

  grid-column-start: 1;
  grid-column-end: 2;

  overflow: hidden;
`;
const PostLinkPreview = styled.div`
  grid-row-start: 2;
  grid-row-end: 3;

  grid-column-start: 2;
  grid-column-end: 3;
`;

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
