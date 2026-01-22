import Image from 'next/image';
import Link from 'next/link';

import { useGetLinkMetadata } from '@/app/hooks/useGetLinkMetadata';

import { styled } from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import Skeleton from '../../common/loading/skeleton';

const HighlightItem = ({
  post,
  postLength,
}: {
  post: Post;
  postLength: number;
}) => {
  const { loading, metadata } = useGetLinkMetadata(post?.linkUrl);

  if (post.postType === 'link' && loading) {
    return (
      <StyledHighlightItem $postLength={postLength}>
        <SkeletonWrapper>
          <Skeleton />
        </SkeletonWrapper>
      </StyledHighlightItem>
    );
  }

  const hasImage = !!post.imageUrls?.length || !!metadata?.image;

  return (
    <StyledHighlightItem $postLength={postLength}>
      <ItemWrapper
        href={`/r/${post.sub.slug}/comments/${post.identifier}`}
        $postLength={postLength}
      >
        <BackgroundImageWrapper>
          {post.postType === 'link' && metadata?.image ? (
            <Image
              src={metadata.image}
              alt={metadata.title || 'Link preview'}
              fill
              sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <Image
              src={post.imageUrls?.[0] || ''}
              alt="Post Image"
              fill
              sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
            />
          )}
        </BackgroundImageWrapper>

        {hasImage && <Overlay />}

        <Title $postImage={!!post.imageUrls?.length || !!metadata?.image}>
          {post.title}
        </Title>
        <UserProfile>
          <IconBox iconUrl={post.user.profileUrl} width={24} height={24} />
        </UserProfile>
      </ItemWrapper>
    </StyledHighlightItem>
  );
};

const StyledHighlightItem = styled.li<{ $postLength: number }>`
  position: relative;

  width: ${({ $postLength }) => 1 / $postLength}%;
  min-width: 174px;

  height: 160px;

  margin-right: var(--spacer-sm);
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ItemWrapper = styled(Link)<{ $postLength: number }>`
  display: block;

  width: 100%;
  height: 100%;

  border: solid var(--line-sm) ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: var(--radius-md);

  padding: var(--spacer-xs) var(--spacer-sm);

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }
`;
const BackgroundImageWrapper = styled.div`
  overflow: hidden;
  border-radius: var(--radius-md);

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: var(--radius-md);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;

  border-radius: var(--radius-md);
  background: ${({ theme }) => theme.colors.overlay.background};

  pointer-events: none;

  transition: opacity 0.2s ease-in-out;
  opacity: 1;

  pointer-events: none;

  ${ItemWrapper}:hover & {
    opacity: 0.5;
  }
`;

const Title = styled.span<{ $postImage: boolean }>`
  position: absolute;
  top: var(--spacer-sm);

  font: var(--font-14-20-semibold);

  color: ${({ theme, $postImage }) =>
    $postImage
      ? theme.colors.neutral.background
      : theme.colors.neutral.contentStrong};

  z-index: 10;
`;

const UserProfile = styled.span`
  position: absolute;
  bottom: var(--spacer-xs);
  left: var(--spacer-sm);

  z-index: 10;
`;

export default HighlightItem;
