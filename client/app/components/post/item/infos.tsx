import formatTimeAgo from '@/app/utils/formatTimeAgo';

import styled from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import EtcIcon from '../../svgs/EtcIcon';

const PostInfos = ({ ...post }: Post) => {
  return (
    <StyledPostInfos>
      <div>
        <IconBox
          iconUrl={post.user.profileUrl}
          altText={post.user.username}
          width={24}
          height={24}
        />
        <span>u/{post.user.username}</span>
        <span>•</span>
        <span>{formatTimeAgo(post.createdAt)}</span>
      </div>
      <IconWrapper>
        <EtcIcon />
      </IconWrapper>
    </StyledPostInfos>
  );
};

const StyledPostInfos = styled.div`
  display: flex;
  justify-content: space-between;

  height: var(--rem-32);

  margin-bottom: var(--spacer-xs);

  div {
    display: flex;
    align-items: center;

    gap: var(--spacer-2xs);

    font: var(--font-12-16-regular);

    cursor: pointer;

    span:nth-child(2) {
      font: var(--font-12-16-bold);

      color: ${({ theme }) => theme.colors.neutral.content};
    }

    span:nth-child(3),
    span:nth-child(4) {
      color: ${({ theme }) => theme.colors.neutral.contentWeak};
    }
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: var(--rem-32);
  height: var(--rem-32);

  border-radius: var(--radius-full);

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }

  svg {
    width: var(--rem-16);
    height: var(--rem-16);

    fill: ${({ theme }) => theme.colors.neutral.contentStrong};
  }
`;

export default PostInfos;
