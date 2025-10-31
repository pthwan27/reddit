import Image from 'next/image';

import formatTimeAgo from '@/app/utils/formatTimeAgo';

import styled from 'styled-components';

import { Post } from '@/app/types';

import EtcIcon from '../svgs/EtcIcon';

const PostItem = ({ post }: { post: Post }) => {
  return (
    <StyledPostItem>
      <TitleSection>
        <UserInfo>
          <IconBox $isIcon={!!post.user.profileUrl}>
            {post.user.profileUrl && (
              <Image src={post.user.profileUrl} alt={post.user.username} fill />
            )}
          </IconBox>
          <span>{post.user.username}</span>
          <span>•</span>
          <span>{formatTimeAgo(post.createdAt)}</span>
        </UserInfo>
        <EtcIcon />
      </TitleSection>
    </StyledPostItem>
  );
};

const StyledPostItem = styled.div``;

const TitleSection = styled.section`
  display: flex;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;

  gap: var(--spacer-2xs);

  font: var(--font-12-16-regular);

  span:nth-child(2) {
    font: var(--font-12-16-bold);

    color: ${({ theme }) => theme.colors.secondaryText};
  }

  span:nth-child(3),
  span:nth-child(4) {
    color: ${({ theme }) => theme.colors.grayText};
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
  background-color: ${({ $isIcon, theme }) =>
    $isIcon ? 'transparent' : theme.colors.dark};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-full);
    object-fit: cover;

    background: transparent;
  }
`;

export default PostItem;
