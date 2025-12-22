import styled from 'styled-components';

import { Post } from '@/app/types';

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
        <StyledHighlightPostList>
          {highlightPosts.map((post) => (
            <HighlightItem
              key={post.id}
              post={post}
              postLength={highlightPosts.length}
            />
          ))}
        </StyledHighlightPostList>
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
const IconWrapper = styled.div<{ $isHighlightView: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--rem-24);
  height: var(--rem-24);

  border-radius: var(--radius-full);

  transform: ${({ $isHighlightView }) =>
    $isHighlightView ? 'rotate(-180deg)' : 'rotate(0deg)'};

  svg {
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

  > li:first-child {
    padding-inline-start: var(--spacer-md);
  }
`;

export default HighlightPosts;
