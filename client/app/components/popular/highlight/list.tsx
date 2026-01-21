import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import ChevronLeftIcon from '../../svgs/ChevronLeftIcon';
import ChevronRightIcon from '../../svgs/ChevronRightIcon';
import PopularHighlightItem from './item';

interface PopularHighlightListProps {
  highlightPosts: Post[];
  highlightLoading: boolean;
}
const PopularHighlightPosts = ({
  highlightPosts,
  highlightLoading,
}: PopularHighlightListProps) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;

    const itemWidth =
      scrollContainerRef.current.scrollWidth / highlightPosts.length;

    scrollContainerRef.current.scrollBy({
      left: -itemWidth,
      behavior: 'smooth',
    });
  };
  const scrollRight = () => {
    if (!scrollContainerRef.current) return;

    const itemWidth =
      scrollContainerRef.current.scrollWidth / highlightPosts.length;

    scrollContainerRef.current.scrollBy({
      left: itemWidth,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (highlightPosts.length > 0 && scrollContainerRef.current) {
      setTimeout(() => {
        checkScrollability();
        setIsInitialized(true);
      }, 100);
    }
  }, [highlightPosts]);
  return (
    <>
      <CarouselWrapper>
        {isInitialized && canScrollLeft && (
          <ScrollButton $direction="left" onClick={scrollLeft}>
            <IconBox
              icon={<ChevronLeftIcon />}
              width={32}
              height={32}
              percentage={50}
              backgroundColor="media"
            />
          </ScrollButton>
        )}
        <StyledHighlightPostList
          ref={scrollContainerRef}
          onScroll={checkScrollability}
        >
          {highlightPosts.map((post) => (
            <PopularHighlightItem
              key={post.id}
              post={post}
              postLength={highlightPosts.length}
              highlightLoading={highlightLoading}
            />
          ))}
        </StyledHighlightPostList>

        {isInitialized && canScrollRight && (
          <ScrollButton $direction="right" onClick={scrollRight}>
            <IconBox
              icon={<ChevronRightIcon />}
              width={32}
              height={32}
              percentage={50}
              backgroundColor="media"
            />
          </ScrollButton>
        )}
      </CarouselWrapper>
    </>
  );
};

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;

  margin-top: var(--spacer-md);
`;

const StyledHighlightPostList = styled.ul`
  display: flex;

  width: 100%;
  height: 100%;

  min-height: 226px;

  margin-bottom: var(--spacer-xs);

  overflow-x: auto;

  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Opera */
  }

  > li {
    margin-right: var(--spacer-sm);
  }
`;

const ScrollButton = styled.button<{ $direction: 'left' | 'right' }>`
  padding: 0;
  background: none;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${({ $direction }) =>
    $direction === 'left' ? 'left: var(--rem-6);' : 'right: var(--rem-6);'}

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10;

  border: none;

  &:hover {
    border: none;
  }
`;

export default PopularHighlightPosts;
