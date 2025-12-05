import { useState } from 'react';

import DOMPurify from 'dompurify';
import styled from 'styled-components';

import { Post } from '@/app/types';

import MediaCarousel from '../../common/mediaCarousel';

const HomePostBody = ({
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
            />
          </MediaCarouselWrapper>
        </>
      )}
      {postType === 'link' && <Link>{linkUrl}</Link>}
      {postType === 'text' && (
        <Content dangerouslySetInnerHTML={{ __html: cleanContent }} />
      )}
    </>
  );
};

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: var(--spacer-xs);

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
`;

const Link = styled.a`
  margin-bottom: var(--spacer-xs);

  font-weight: 600;

  font-size: 0.75rem;
  line-height: 1rem;

  @media (min-width: 768px) {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  text-decoration: none;
  color: ${({ theme }) => theme.colors.a.default};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.a.hover};
  }

  &:visited {
    color: ${({ theme }) => theme.colors.a.visited};
  }
`;

export default HomePostBody;
