import { styled } from 'styled-components';

import { Post } from '@/app/types';

const HighlightItem = ({
  post,
  postLength,
}: {
  post: Post;
  postLength: number;
}) => {
  return (
    <StyledHighlightItem $postLength={postLength}>
      <ItemWrapper $postLength={postLength}>{post.title}</ItemWrapper>
    </StyledHighlightItem>
  );
};

const StyledHighlightItem = styled.li<{ $postLength: number }>`
  position: relative;

  width: ${({ $postLength }) => 1 / $postLength}%;
  min-width: 25%;

  height: 160px;

  margin-right: var(--spacer-sm);
`;

const ItemWrapper = styled.a<{ $postLength: number }>`
  display: block;
  width: 100%;
  height: 100%;

  background: ${({ theme }) => theme.colors.neutral.background};

  border: solid var(--line-sm) ${({ theme }) => theme.colors.neutral.borderWeak};

  border-radius: var(--radius-md);

  padding: var(--spacer-xs) var(--spacer-sm);

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }
`;

export default HighlightItem;
