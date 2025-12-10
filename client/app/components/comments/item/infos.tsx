import formatTimeAgo from '@/app/utils/formatTimeAgo';

import styled from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import ArrowBackIcon from '../../svgs/ArrowBackIcon';
import EtcIcon from '../../svgs/EtcIcon';

const CommentPostInfos = ({ ...post }: Post) => {
  return (
    <StyledPostInfos>
      <PostInfoWrapper>
        <IconBox
          icon={<ArrowBackIcon />}
          width={32}
          height={32}
          percentage={50}
          backgroundColor="secondary"
        />
        <PostInfo>
          <IconBox
            iconUrl={post.user.profileUrl}
            altText={post.user.username}
            width={32}
            height={32}
          />
          <InfoWrapper>
            <Info>
              <span>r/{post.sub.title}</span>
              <span>•</span>
              <span>{formatTimeAgo(post.createdAt)}</span>
            </Info>
            <User>
              <span>u/{post.user.username}</span>
            </User>
          </InfoWrapper>
        </PostInfo>
      </PostInfoWrapper>
      <IconWrapper>
        <EtcIcon />
      </IconWrapper>
    </StyledPostInfos>
  );
};

const StyledPostInfos = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;

  padding: var(--spacer-md) var(--spacer-md) var(--spacer-2xs);

  @media (min-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const PostInfoWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: var(--spacer-xs);

  > div:first-child {
    display: none;
  }

  @media (min-width: 768px) {
    > div:first-child {
      display: flex;
    }
  }

  @media (min-width: 1472px) {
    > div:first-child {
      position: absolute;
      top: 1rem;
      inset-inline-start: -2.5rem;
    }
  }
`;

const PostInfo = styled.div`
  display: flex;
  gap: var(--spacer-2xs);
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: var(--rem-32);
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  line-height: 1rem;
  gap: var(--spacer-2xs);

  height: 50%;

  font: var(--font-12-16-regular);

  > span:nth-child(1) {
    font: var(--font-12-16-bold);
    line-height: 1rem;

    color: ${({ theme }) => theme.colors.neutral.content};
  }

  > span:nth-child(2),
  > span:nth-child(3) {
    color: ${({ theme }) => theme.colors.neutral.contentWeak};
  }
`;
const User = styled.div`
  height: 50%;

  font: var(--font-12-16-regular);
  line-height: 1rem;
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
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

export default CommentPostInfos;
