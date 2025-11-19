import { useState } from 'react';

import styled from 'styled-components';

import { Post } from '@/app/types';

import MediaCarousel from '../common/mediaCarousel';

const PostBody = ({
  title,
  body,
  postType = 'text',
  mediaType = 'image',
  imageUrls = [],
  videoUrl = '',
  linkUrl = '',
}: Post) => {
  const [curImgIdx, setcurImgIdx] = useState(0);
  const mediaUrls = [...imageUrls, videoUrl];

  return (
    <>
      <Title>{title}</Title>
      {postType === 'media' && (
        <MediaCarouselWrapper>
          <MediaCarousel
            mediaUrls={mediaUrls}
            curIdx={curImgIdx}
            setCurIdx={setcurImgIdx}
            mediaType={mediaType}
          />
        </MediaCarouselWrapper>
      )}

      {postType === 'link' && <a href={linkUrl}>{linkUrl}</a>}

      <Content>{body}</Content>
    </>
  );
};

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: var(--spacer-xs);

  font: var(--font-24-semibold);
`;

const MediaCarouselWrapper = styled.div`
  position: relative;
  min-height: min(20vw, 250px);
  height: max(23vw, 250px);
`;
const Content = styled.div`
  padding-bottom: var(--spacer-2xs);

  font: var(--font-14-20-regular);
`;

export default PostBody;
