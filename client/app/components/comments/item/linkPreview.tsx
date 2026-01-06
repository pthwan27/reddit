'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useGetLinkMetadata } from '@/app/hooks/useGetLinkMetadata';

import styled from 'styled-components';

import Skeleton from '../../common/loading/skeleton';

const CommentPostLinkPreview = ({ url }: { url: string }) => {
  const { metadata, loading, error } = useGetLinkMetadata(url);

  const openLinkInNewTab = () => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <StyledPreview href={url} target="_blank" rel="noopener noreferrer">
        <Skeleton />
      </StyledPreview>
    );
  }

  if (error || !metadata) {
    return (
      <StyledPreview href={url} target="_blank" rel="noopener noreferrer">
        <DefaultPreview>
          <LinkIcon>🔗</LinkIcon>
          <PreviewUrl></PreviewUrl>
        </DefaultPreview>
      </StyledPreview>
    );
  }

  return (
    <StyledPreview href={url} target="_blank" rel="noopener noreferrer">
      {metadata.image && (
        <PreviewImage>
          <Image
            src={metadata.image}
            alt={metadata.title || 'Link preview'}
            fill
            sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
            style={{ objectFit: 'contain' }}
          />
        </PreviewImage>
      )}
      <PreviewInfo>
        {metadata.siteName && <SiteName>{metadata.siteName}</SiteName>}
        {metadata.title && <PreviewTitle>{metadata.title}</PreviewTitle>}
        {metadata.description && (
          <PreviewDescription>{metadata.description}</PreviewDescription>
        )}

        <OpenButton onClick={openLinkInNewTab}>열기</OpenButton>
      </PreviewInfo>
    </StyledPreview>
  );
};

const StyledPreview = styled(Link)`
  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.neutral.background};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: var(--radius-md);
  overflow: hidden;
`;

const PreviewImage = styled.div`
  position: relative;

  aspect-ratio: auto 16/9;
`;

const PreviewInfo = styled.div`
  position: relative;
  display: flex;

  padding: var(--spacer-sm);
  flex-direction: column;
  gap: var(--spacer-2xs);
`;

const SiteName = styled.div`
  font: var(--font-12-16-regular);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
  text-transform: uppercase;

  &:hover {
    text-decoration-line: underline;
  }
`;

const PreviewTitle = styled.div`
  font: var(--font-14-semibold);
  color: ${({ theme }) => theme.colors.neutral.contentStrong};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration-line: underline;
  }
`;

const PreviewDescription = styled.div`
  font: var(--font-12-16-regular);
  color: ${({ theme }) => theme.colors.neutral.content};

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  padding-right: var(--spacer-3xl);
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

const OpenButton = styled.button`
  position: absolute;
  left: auto;
  right: var(--spacer-sm);

  bottom: var(--spacer-sm);

  font: var(--font-14-20-semibold);

  color: ${({ theme }) => theme.colors.secondary.plain};

  border: var(--line-sm) solid
    ${({ theme }) => theme.colors.secondary.plainWeak};

  &:hover {
    border: var(--line-sm) solid
      ${({ theme }) => theme.colors.secondary.plainHover};
  }
`;

export default CommentPostLinkPreview;
