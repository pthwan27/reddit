import { useRouter } from 'next/navigation';

import formatTimeAgo from '@/app/utils/formatTimeAgo';

import styled from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';

const RecentPostInfos = ({ post }: { post: Post }) => {
  const router = useRouter();

  const goToSub = (e: React.MouseEvent) => {
    e.stopPropagation();

    router.push(`/r/${post.sub.slug}`);
  };

  return (
    <StyledHomePostInfos>
      <div>
        {post.sub.iconUrl ? (
          <IconBox
            iconUrl={post.sub.iconUrl}
            altText={post.sub.title}
            width={24}
            height={24}
          />
        ) : (
          <div style={{ width: '24px', height: '24px' }} />
        )}
        <SubTitle onClick={(e) => goToSub(e)}>r/{post.sub.title}</SubTitle>
        <span>•</span>
        <span>{formatTimeAgo(post.createdAt)}</span>
      </div>
    </StyledHomePostInfos>
  );
};

const StyledHomePostInfos = styled.div`
  display: flex;
  justify-content: space-between;

  height: var(--rem-32);

  margin-top: calc(-1 * var(--spacer-2xs));

  > div {
    display: flex;
    align-items: center;

    gap: var(--spacer-2xs);

    font: var(--font-12-16-regular);

    cursor: pointer;

    > span {
      display: flex;
      align-items: center;
      height: var(--rem-32);
    }

    > span:nth-child(3),
    > span:nth-child(4) {
      color: ${({ theme }) => theme.colors.neutral.contentWeak};
    }

    > span:nth-child(4) {
      font: var(--font-12-16-regular);

      line-height: 1rem;
    }
  }
`;

const SubTitle = styled.span`
  font: var(--font-12-16-semibold);
  line-height: 1rem;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  color: ${({ theme }) => theme.colors.neutral.contentWeak};

  &:hover {
    text-decoration-line: underline;
  }
`;

export default RecentPostInfos;
