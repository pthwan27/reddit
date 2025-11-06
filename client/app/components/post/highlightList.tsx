import styled from 'styled-components';

import DownArrowIcon from '../svgs/DownArrowIcon';
import PinIcon from '../svgs/PinIcon';

interface HighlightListProps {
  isHighlightView: boolean;
  setIsHighlightView: React.Dispatch<React.SetStateAction<boolean>>;
}
const HightlightPostList = ({
  isHighlightView,
  setIsHighlightView,
}: HighlightListProps) => {
  return (
    <>
      <StyledHighlightToggle
        $isHighlightView={isHighlightView}
        onClick={() => setIsHighlightView((e) => !e)}
      >
        <div>
          <PinIcon />
          <span>커뮤니티 하이라이트</span>
        </div>
        <div>
          <DownArrowIcon />
        </div>
      </StyledHighlightToggle>

      {isHighlightView && <StyledHighlightPostList></StyledHighlightPostList>}
    </>
  );
};

const StyledHighlightToggle = styled.div<{ $isHighlightView: boolean }>`
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
      fill: ${({ theme }) => theme.colors.secondaryText};
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
  div:nth-child(2) {
    svg {
      width: var(--rem-12);
      height: var(--rem-12);
    }
    transform: ${({ $isHighlightView }) =>
      $isHighlightView ? 'rotate(-180deg)' : 'rotate(0deg)'};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.contentHover};
    border-radius: var(--radius-md);
  }
`;
const StyledHighlightPostList = styled.div`
  height: 200px;
  background: lightgray;

  margin-bottom: var(--spacer-xs);
`;

export default HightlightPostList;
