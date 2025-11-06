import Image from 'next/image';

import formatTimeAgo from '@/app/utils/formatTimeAgo';

import styled from 'styled-components';

import { Post } from '@/app/types';

import EtcIcon from '../../svgs/EtcIcon';

const PostInfos = ({ ...post }: Post) => {
  return (
    <StyledPostInfos>
      <div>
        <IconBox $isIcon={!!post.user.profileUrl}>
          {post.user.profileUrl && (
            <Image src={post.user.profileUrl} alt={post.user.username} fill />
          )}
        </IconBox>
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

  margin-bottom: var(--spacer-xs);

  height: var(--rem-32);

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

const IconBox = styled.div<{ $isIcon?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: var(--rem-24);
  height: var(--rem-24);

  min-width: var(--rem-24);
  min-height: var(--rem-24);

  border-radius: var(--radius-full);
  background: ${({ $isIcon, theme }) =>
    $isIcon ? 'transparent' : theme.colors.neutral.content};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-full);
    object-fit: cover;

    background: transparent;
  }
`;

export default PostInfos;
