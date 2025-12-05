import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import LinkPreview from '@/app/components/post/item/linkPreview';

import { Post } from '@/app/types';

import PostActions from '../../../components/post/item/actions';
import PostBody from '../../../components/post/item/body';
import PostInfos from '../../../components/post/item/infos';

const HomePostItem = ({ post }: { post: Post }) => {
  const router = useRouter();

  const goToComments = () => {
    router.push(`/r/${post.sub.slug}/comments/${post.identifier}`);
  };

  if (post.postType === 'link') {
    return (
      <PostLinkItemContainer onClick={() => goToComments()}>
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
      </PostLinkItemContainer>
    );
  }

  return (
    <PostItemContainer onClick={() => goToComments()}>
      <PostInfos {...post} />
      <PostBody {...post} />
      <PostActions {...post} />
    </PostItemContainer>
  );
};

const PostLinkItemContainer = styled.div`
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

const PostItemContainer = styled.div`
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

export default HomePostItem;
