import Image from 'next/image';
import { useEffect, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';

import styled from 'styled-components';

import { Post } from '@/app/types';

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

  return (
    <>
      <Title>{title}</Title>
      {postType === 'media' && (
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
      )}

      {loading && postType === 'link' ? (
        <Skeleton />
      ) : (
        <>
          {metadata && metadata.image && !error && (
            <LinkWrapper>
              <Image
                src={metadata.image}
                alt={metadata.title || 'Link preview'}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'cover' }}
              />
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
  min-height: 200px;
  max-height: 540px;
  height: auto;

  margin-bottom: var(--spacer-xs);
`;

const Skeleton = styled.div`
  width: 100%;
  height: var(--rem-320);
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
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
  max-height: 540px;

  > img {
    position: relative;
    object-fit: contain;

    width: auto;
    max-width: 100%;

    height: auto;
    max-height: 540px;
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
