'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';

import styled from 'styled-components';

import Skeleton from '../../common/loading/skeleton';

interface LinkPreviewProps {
  url: string;
}

interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

const LinkPreview = ({ url }: LinkPreviewProps) => {
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMetadata = async () => {
      try {
        const { data } = await clientAxiosInstance.get(
          `/api/linkPreview?url=${encodeURIComponent(url)}`
        );

        setMetadata(data);
      } catch (err) {
        console.error('Link preview error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      getMetadata();
    }
  }, [url]);

  if (loading) {
    return (
      <StyledPreview>
        <Skeleton />
      </StyledPreview>
    );
  }

  if (error || !metadata) {
    return (
      <StyledPreview>
        <DefaultPreview>
          <LinkIcon>🔗</LinkIcon>
          <PreviewUrl></PreviewUrl>
        </DefaultPreview>
      </StyledPreview>
    );
  }

  return (
    <StyledPreview>
      {metadata.image && (
        <PreviewImage>
          <Image
            src={metadata.image}
            alt={metadata.title || 'Link preview'}
            fill
            sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
            style={{ objectFit: 'cover' }}
          />
        </PreviewImage>
      )}
      <PreviewInfo>
        {metadata.siteName && <SiteName>{metadata.siteName}</SiteName>}
        {metadata.title && <PreviewTitle>{metadata.title}</PreviewTitle>}
        {metadata.description && (
          <PreviewDescription>{metadata.description}</PreviewDescription>
        )}
      </PreviewInfo>
    </StyledPreview>
  );
};

const StyledPreview = styled.div`
  display: flex;
  flex-direction: column;

  width: 114px;
  height: 88px;

  @media (min-width: 768px) {
    width: 130px;
  }
  @media (min-width: 768px) {
    height: 100px;
  }

  background: ${({ theme }) => theme.colors.neutral.background};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const PreviewImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`;

const PreviewInfo = styled.div`
  padding: var(--spacer-sm);
  display: flex;
  flex-direction: column;
  gap: var(--spacer-2xs);
`;

const SiteName = styled.div`
  font: var(--font-12-16-regular);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
  text-transform: uppercase;
`;

const PreviewTitle = styled.div`
  font: var(--font-14-semibold);
  color: ${({ theme }) => theme.colors.neutral.contentStrong};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PreviewDescription = styled.div`
  font: var(--font-12-16-regular);
  color: ${({ theme }) => theme.colors.neutral.content};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DefaultPreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacer-xs);
`;

const LinkIcon = styled.div`
  font-size: 2rem;
`;

const PreviewUrl = styled.div`
  font: var(--font-14-regular);
  color: ${({ theme }) => theme.colors.neutral.content};
`;

export default LinkPreview;
