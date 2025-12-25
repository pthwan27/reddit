import Link from 'next/link';

import DOMPurify from 'dompurify';
import { styled } from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import HighlightPostLinkPreview from './linkPreview';

const HomeHighlightItem = ({
  post,
  postLength,
}: {
  post: Post;
  postLength: number;
}) => {
  // const { metadata, loading, error } = useGetLinkMetadata(post.url);

  const cleanContent = DOMPurify.sanitize(post.body);

  if (post.postType === 'link' && post.linkUrl)
    return <HighlightPostLinkPreview url={post.linkUrl} />;

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
        <Title>{post.title}</Title>
        <Content dangerouslySetInnerHTML={{ __html: cleanContent }} />

        <UserProfile>
          <IconBox iconUrl={post.sub.iconUrl} width={24} height={24} />
          <SubTitle>{post.sub.title} </SubTitle>
        </UserProfile>
      </ItemWrapper>
    </StyledHighlightItem>
  );
};

const StyledHighlightItem = styled.li<{ $postLength: number }>`
  width: ${({ $postLength }) => 1 / $postLength}%;
  min-width: 280px;

  height: 226px;

  margin-right: var(--spacer-sm);
`;

const ItemWrapper = styled(Link)<{ $postLength: number }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  position: relative;

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

const Title = styled.span`
  font: var(--font-title-h3);

  color: ${({ theme }) => theme.colors.neutral.background};
`;

const Content = styled.span`
  font: var(--font-14-20-regular);
  margin: var(--spacer-2xs) 0 var(--spacer-xs) 0;

  color: ${({ theme }) => theme.colors.neutral.background};
`;

const SubTitle = styled.span`
  font: var(--font-12-16-regular);

  color: ${({ theme }) => theme.colors.neutral.background};
`;

const UserProfile = styled.span`
  > span {
    font: var(--font-12-16-semibold);
  }
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
`;

export default HomeHighlightItem;
