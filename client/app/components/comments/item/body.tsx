import { useState } from 'react';

import DOMPurify from 'dompurify';
import styled from 'styled-components';

import { Post } from '@/app/types';

import MediaCarousel from '../../common/mediaCarousel';
import CommentPostLinkPreview from './linkPreview';

const CommentPostBody = ({
  title,
  body,
  postType = 'text',
  mediaType = 'image',
  imageUrls = [],
  videoUrl = '',
  linkUrl = '',
}: Post) => {
  const [curImgIdx, setCurImgIdx] = useState(0);
  const cleanContent = DOMPurify.sanitize(body);

  return (
    <StyledCommentPostBody>
      <Title>{title}</Title>
      {postType === 'media' && (
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
      )}
      {postType === 'link' && <CommentPostLinkPreview url={linkUrl} />}
      {postType === 'text' && (
        <Content dangerouslySetInnerHTML={{ __html: cleanContent }} />
      )}
    </StyledCommentPostBody>
  );
};

const StyledCommentPostBody = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: var(--spacer-xs);

  padding: var(--spacer-md) var(--spacer-md) var(--spacer-2xs);

  @media (min-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }

  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1.125rem;
    line-height: 1.5rem;
    margin-bottom: var(--spacer-xs);
  }
`;

const MediaCarouselWrapper = styled.div`
  position: relative;
  width: auto;
  height: auto;

  margin-bottom: var(--spacer-xs);
`;

const Content = styled.div`
  padding-bottom: var(--spacer-2xs);

  font-size: 0.75rem;
  line-height: 1rem;

  @media (min-width: 768px) {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  margin-bottom: var(--spacer-xs);

  padding: var(--spacer-md) var(--spacer-md) var(--spacer-2xs);

  @media (min-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export default CommentPostBody;
