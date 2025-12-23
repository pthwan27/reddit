import Link from 'next/link';

import { styled } from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';

const HighlightItem = ({
  post,
  postLength,
}: {
  post: Post;
  postLength: number;
}) => {
  return (
    <StyledHighlightItem $postLength={postLength}>
      <ItemWrapper
        href={`/r/${post.sub.slug}/comments/${post.identifier}`}
        $postLength={postLength}
        style={{
          backgroundImage: post.imageUrls?.[0]
            ? `url(${post.imageUrls[0]})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Title $postImage={!!post.imageUrls?.length}>{post.title}</Title>
        <UserProfile>
          <IconBox iconUrl={post.user.profileUrl} width={24} height={24} />
        </UserProfile>
      </ItemWrapper>
    </StyledHighlightItem>
  );
};

const StyledHighlightItem = styled.li<{ $postLength: number }>`
  width: ${({ $postLength }) => 1 / $postLength}%;
  min-width: 174px;

  height: 160px;

  margin-right: var(--spacer-sm);
`;

const ItemWrapper = styled(Link)<{ $postLength: number }>`
  position: relative;
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

const Title = styled.span<{ $postImage: boolean }>`
  font: var(--font-14-20-semibold);

  color: ${({ theme, $postImage }) =>
    $postImage
      ? theme.colors.neutral.background
      : theme.colors.neutral.contentStrong};
`;

const UserProfile = styled.span`
  position: absolute;
  bottom: var(--spacer-sm);
  left: var(--spacer-sm);
`;

export default HighlightItem;
