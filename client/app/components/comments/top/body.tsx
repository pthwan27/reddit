import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';

import styled from 'styled-components';

import { Post } from '@/app/types';

import Skeleton from '../../common/loading/skeleton';
import MediaCarousel from '../../post/common/mediaCarousel';

interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

const CommentsByPostBody = ({
  title,
  body,
  postType = 'text',
  mediaType = 'image',
  imageUrls = [],
  videoUrl = '',
  linkUrl = '',
}: Post) => {
  const [curImgIdx, setCurImgIdx] = useState(0);
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const { data } = await clientAxiosInstance.get(
          `/api/linkPreview?url=${encodeURIComponent(linkUrl)}`
        );

        setMetadata(data);
      } catch (err) {
        console.error('Link preview error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (linkUrl) {
      getMetadata();
    }
  }, [linkUrl]);

  useEffect(() => {
    if (postType !== 'link' && (imageUrls.length > 0 || videoUrl !== '')) {
      setLoading(false);
    }
  }, [postType, imageUrls, videoUrl]);

  return (
    <>
      <Title>{title}</Title>
      {loading ? (
        <SkeletonWrapper $postType={postType}>
          <Skeleton />
        </SkeletonWrapper>
      ) : postType === 'media' ? (
        <>
          <MediaCarouselWrapper>
            <MediaCarousel
              mediaUrls={mediaType === 'image' ? imageUrls : [videoUrl]}
              curIdx={curImgIdx}
              setCurIdx={setCurImgIdx}
              mediaType={mediaType}
              version={'view'}
              noBorderRadiusOnMobile={true}
            />
          </MediaCarouselWrapper>
        </>
      ) : (
        <>
          {metadata && metadata.image && !error && (
            <LinkWrapper onClick={() => window.open(linkUrl, '_blank')}>
              <LinkImgWrapper>
                <Image
                  src={metadata.image}
                  alt={metadata.title || 'Link preview'}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </LinkImgWrapper>
              <LinkActions>
                <Link
                  href={linkUrl}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >
                  {metadata.siteName}
                </Link>
                <button>열기</button>
              </LinkActions>
            </LinkWrapper>
          )}
        </>
      )}

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

const MediaCarouselWrapper = styled.div`
  position: relative;

  margin-bottom: var(--spacer-xs);
`;

const SkeletonWrapper = styled.div<{ $postType: string }>`
  width: 100%;
  height: ${({ $postType }) =>
    $postType === 'media' ? 'var(--rem-480)' : 'var(--rem-320)'};

  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.neutral.background} 25%,
    ${({ theme }) => theme.colors.neutral.border} 50%,
    ${({ theme }) => theme.colors.neutral.background} 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const LinkWrapper = styled.div`
  display: block;

  box-shadow: 0 0 0 var(--line-sm)
    ${({ theme }) => theme.colors.neutral.borderWeak} inset;
  overflow: hidden;

  border-radius: 0;

  margin-bottom: var(--spacer-xs);

  cursor: pointer;

  @media (min-width: 768px) {
    border-radius: var(--radius-xl);
  }
`;

const LinkImgWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: auto;
  height: auto;

  max-height: 540px;

  aspect-ratio: auto 16/9;

  > img {
    position: relative;
    object-fit: fill;

    width: auto;

    height: auto;
    max-height: 540px;

    aspect-ratio: auto 16/9;
  }
`;

const LinkActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: var(--spacer-xs) var(--spacer-md);

  > a {
    color: ${({ theme }) => theme.colors.a.default};

    &:hover {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.a.hover};
    }

    &:visited {
      color: ${({ theme }) => theme.colors.a.visited};
    }
  }

  > button {
   
    font: var(--font-14-20-semibold);
    line-height: 1.5;
    border: var(--line-sm) solid
      ${({ theme }) => theme.components.button.border.default};
    padding: var(--spacer-xs) var(--spacer-md);

    &:hover {
    border : var(--line-sm) solid ${({ theme }) =>
      theme.components.button.border.hover};
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
