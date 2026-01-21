import Image from 'next/image';
import Link from 'next/link';

import { useGetLinkMetadata } from '@/app/hooks/useGetLinkMetadata';

import DOMPurify from 'dompurify';
import { styled } from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import Skeleton from '../../common/loading/skeleton';

const PopularHighlightItem = ({
  post,
  postLength,
  highlightLoading,
}: {
  post: Post;
  postLength: number;
  highlightLoading: boolean;
}) => {
  const { loading, metadata } = useGetLinkMetadata(post?.linkUrl);

  const cleanContent = DOMPurify.sanitize(post.body);

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

  if (highlightLoading) {
    return (
      <StyledHighlightItem $postLength={postLength || 5}>
        <SkeletonWrapper>
          <Skeleton />
        </SkeletonWrapper>
      </StyledHighlightItem>
    );
  }

  return (
    <StyledHighlightItem $postLength={postLength || 5}>
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

        <Title>{post.title}</Title>
        <Content dangerouslySetInnerHTML={{ __html: cleanContent }} />

        <UserProfile>
          <IconBox iconUrl={post.sub.iconUrl} width={24} height={24} />
          <SubTitle>{post.sub.title} </SubTitle>
        </UserProfile>
      </ItemWrapper>
    </StyledHighlightItem>
  );
};

const StyledHighlightItem = styled.li<{ $postLength: number }>`
  position: relative;

  width: ${({ $postLength }) => 1 / $postLength}%;
  min-width: 280px;

  height: 226px;
  min-height: 226px;

  margin-right: var(--spacer-sm);
`;

const SkeletonWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ItemWrapper = styled(Link)<{ $postLength: number }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.colors.neutral.background};

  border: solid var(--line-sm) ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: var(--radius-md);

  padding: var(--spacer-xs) var(--spacer-sm);

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
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
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.15) 30%,
    rgba(0, 0, 0, 0.05) 50%,
    rgba(0, 0, 0, 0.15) 70%,
    rgba(0, 0, 0, 0.25) 100%
  );

  pointer-events: none;

  transition: opacity 0.2s ease-in-out;
  opacity: 1;

  pointer-events: none;

  ${ItemWrapper}:hover & {
    opacity: 0.5;
  }
`;

const Title = styled.span`
  font: var(--font-title-h3);

  color: ${({ theme }) => theme.colors.neutral.background};

  z-index: 10;
`;

const Content = styled.span`
  font: var(--font-14-20-regular);
  margin: var(--spacer-2xs) 0 var(--spacer-xs) 0;

  color: ${({ theme }) => theme.colors.neutral.background};

  z-index: 10;
`;

const SubTitle = styled.span`
  font: var(--font-12-16-regular);

  color: ${({ theme }) => theme.colors.neutral.background};

  z-index: 10;
`;

const UserProfile = styled.span`
  > span {
    font: var(--font-12-16-semibold);
  }
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
`;

export default PopularHighlightItem;
