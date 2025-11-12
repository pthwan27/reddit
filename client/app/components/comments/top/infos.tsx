import formatTimeAgo from '@/app/utils/formatTimeAgo';

import styled from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import ArrowBackIcon from '../../svgs/ArrowBackIcon';

const CommentsByPostInfos = ({ ...post }: Post) => {
  return (
    <StyledCommentsByPostInfos>
      <BackButton onClick={() => history.back()}>
        <IconBox
          icon={<ArrowBackIcon />}
          width={32}
          height={32}
          percentage={50}
          backgroundColor={'secondary'}
        />
      </BackButton>

      <IconBox
        iconUrl={post.sub.iconUrl}
        altText={post.sub.title}
        width={32}
        height={32}
      />
      <TopInfo>
        <div>
          <span>r/{post.sub.title}</span>
          <span>•</span>
          <span>{formatTimeAgo(post.createdAt)}</span>
        </div>

        <span>{post.user.username}</span>
      </TopInfo>
    </StyledCommentsByPostInfos>
  );
};

const StyledCommentsByPostInfos = styled.div`
  position: relative;
  display: flex;
  gap: var(--spacer-xs);

  padding: var(--spacer-md) var(--spacer-md) var(--spacer-2xs);

  @media (min-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;
const BackButton = styled.button`
  display: none;

  @media (min-width: 1472px) {
    top: 1rem;
  }

  @media (min-width: 1472px) {
    inset-inline-start: -2.5rem;
  }
  @media (min-width: 1472px) {
    position: absolute;
  }
  @media (min-width: 768px) {
    display: block;
  }

  padding: 0;
`;

const TopInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    display: flex;
    align-items: baseline;
    gap: var(--spacer-2xs);

    height: var(--rem-16);

    font-size: 0.75rem;
    line-height: 1rem;

    color: ${({ theme }) => theme.colors.neutral.contentWeak};

    span:nth-child(1) {
      color: ${({ theme }) => theme.colors.neutral.content};
      font: var(--font-12-16-bold);
    }
  }

  > span {
    color: ${({ theme }) => theme.colors.neutral.content};

    font-size: 0.75rem;
    line-height: 1rem;
  }
`;

export default CommentsByPostInfos;
