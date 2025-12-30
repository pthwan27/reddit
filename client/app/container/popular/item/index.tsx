import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import PopularPostActions from '@/app/components/popular/item/actions';
import PopularPostBody from '@/app/components/popular/item/body';
import PopularPostInfos from '@/app/components/popular/item/infos';
import PopularPostLinkPreview from '@/app/components/popular/item/linkPreview';

import { Post } from '@/app/types';

const PopularPostItem = ({ post }: { post: Post }) => {
  const router = useRouter();

  const goToComments = () => {
    router.push(`/r/${post.sub.slug}/comments/${post.identifier}`);
  };

  if (post.postType === 'link') {
    return (
      <PopularPostLinkItemContainer onClick={() => goToComments()}>
        <PostHeader>
          <PopularPostInfos post={post} />
        </PostHeader>
        <PostContent>
          <PopularPostBody {...post} />
        </PostContent>
        <PostLinkPreview>
          {post.linkUrl && <PopularPostLinkPreview url={post.linkUrl} />}
        </PostLinkPreview>

        <PopularPostActions {...post} />
      </PopularPostLinkItemContainer>
    );
  }

  return (
    <PopularPostItemContainer onClick={() => goToComments()}>
      <PopularPostInfos post={post} />
      <PopularPostBody {...post} />
      <PopularPostActions {...post} />
    </PopularPostItemContainer>
  );
};

const PopularPostLinkItemContainer = styled.div`
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

const PopularPostItemContainer = styled.div`
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

export default PopularPostItem;
