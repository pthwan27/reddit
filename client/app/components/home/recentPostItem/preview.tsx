'use client';

import Image from 'next/image';

import styled from 'styled-components';

import RecentPostLinkPreview from './linkPreview';

interface RecentPostPreviewProps {
  postType: 'link' | 'media';
  linkUrl?: string;
  mediaType?: 'image' | 'video' | null;
  imageUrls?: string[];
  videoUrl?: string;
}

const RecentPostPreview = ({
  postType,
  linkUrl,
  mediaType,
  imageUrls,
  videoUrl,
}: RecentPostPreviewProps) => {
  if (postType === 'link' && linkUrl) {
    return <RecentPostLinkPreview url={linkUrl} />;
  }

  if (postType === 'media' && mediaType === 'image' && imageUrls) {
    return (
      <ImageWrapper>
        <Image
          src={imageUrls[0]}
          alt="Post Image"
          fill
          sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
          style={{ objectFit: 'cover' }}
        />
      </ImageWrapper>
    );
  }

  if (postType === 'media' && mediaType === 'video' && videoUrl) {
    return (
      <VideoWrapper>
        <video src={videoUrl} controls />
      </VideoWrapper>
    );
  }

  return null;
};

const ImageWrapper = styled.div`
  position: relative;
  width: 82px;
  height: 82px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  overflow: hidden;

  @media (min-width: 768px) {
    width: 82px;
    height: 82px;
  }
`;

const VideoWrapper = styled.div`
  width: 114px;
  height: 88px;
  flex-shrink: 0;
  border-radius: var(--radius-md);
  overflow: hidden;

  @media (min-width: 768px) {
    width: 130px;
    height: 100px;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default RecentPostPreview;
