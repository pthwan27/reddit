import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import ChevronLeftIcon from '../../svgs/ChevronLeftIcon';
import ChevronRightIcon from '../../svgs/ChevronRightIcon';
import DownArrowIcon from '../../svgs/DownArrowIcon';
import PinIcon from '../../svgs/PinIcon';
import HighlightItem from './item';

interface HighlightListProps {
  highlightPosts: Post[];
  isHighlightView: boolean;
  setIsHighlightView: React.Dispatch<React.SetStateAction<boolean>>;
}
const HighlightPosts = ({
  highlightPosts,
  isHighlightView,
  setIsHighlightView,
}: HighlightListProps) => {
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
      <StyledHighlightToggle onClick={() => setIsHighlightView((e) => !e)}>
        <div>
          <PinIcon />
          <span>커뮤니티 하이라이트</span>
        </div>
        <IconWrapper $isHighlightView={isHighlightView}>
          <DownArrowIcon />
        </IconWrapper>
      </StyledHighlightToggle>

      {isHighlightView && (
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
              <HighlightItem
                key={post.id}
                post={post}
                postLength={highlightPosts.length}
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
      )}
    </>
  );
};

const StyledHighlightToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: var(--font-14);

  height: var(--rem-32);

  padding: var(--spacer-2xs) var(--spacer-md);
  margin-bottom: var(--spacer-2xs);

  cursor: pointer;

  div {
    svg {
      fill: ${({ theme }) => theme.colors.neutral.contentStrong};
    }
  }

  div:nth-child(1) {
    display: flex;
    align-items: center;

    gap: var(--spacer-xs);

    span {
      text-wrap: nowrap;
      line-height: 1.2;
    }
  }

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
    border-radius: var(--radius-md);
  }
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const IconWrapper = styled.div<{ $isHighlightView: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--rem-24);
  height: var(--rem-24);

  border-radius: var(--radius-full);

  transform: ${({ $isHighlightView }) =>
    $isHighlightView ? 'rotate(-180deg)' : 'rotate(0deg)'};

  > svg {
    width: var(--rem-12);
    height: var(--rem-12);

    fill: ${({ theme }) => theme.colors.neutral.contentStrong};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }
`;

const StyledHighlightPostList = styled.ul`
  display: flex;

  width: 100%;
  height: 100%;

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

  > li:first-child {
    margin-left: var(--spacer-md);
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

export default HighlightPosts;
