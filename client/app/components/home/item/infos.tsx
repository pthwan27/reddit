import { useRouter } from 'next/navigation';

import formatTimeAgo from '@/app/utils/formatTimeAgo';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import { Post, Sub } from '@/app/types';

import IconBox from '../../common/IconBox';
import EtcIcon from '../../svgs/EtcIcon';

const HomePostInfos = ({ post }: { post: Post }) => {
  const router = useRouter();
  const { handleSubscribe: subscribe } = useSubStore();

  const goToSub = (e: React.MouseEvent) => {
    e.stopPropagation();

    router.push(`/r/${post.sub.slug}`);
  };

  const handleSubscribe = (e: React.MouseEvent, sub: Sub) => {
    e.stopPropagation();

    subscribe(sub);
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
      <IconsWrapper>
        {post.sub.isSubscribed ? (
          <></>
        ) : (
          <RegisterButton onClick={(e) => handleSubscribe(e, post.sub)}>
            가입
          </RegisterButton>
        )}

        <IconWrapper>
          <EtcIcon />
        </IconWrapper>
      </IconsWrapper>
    </StyledHomePostInfos>
  );
};

const StyledHomePostInfos = styled.div`
  display: flex;
  justify-content: space-between;

  height: var(--rem-32);

  margin-top: calc(-1 * var(--spacer-2xs));
  margin-bottom: var(--spacer-2xs);

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

  color: ${({ theme }) => theme.colors.neutral.content};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.plain};
  }
`;

const IconsWrapper = styled.div``;

const RegisterButton = styled.button`
  height: var(--rem-24);

  padding: 0 11px;

  border-radius: var(--radius-lg);

  font: var(--font-12-16-bold);
  line-height: 1;

  background: ${({ theme }) => theme.colors.primary.background};
  color: ${({ theme }) => theme.colors.global.white};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.backgroundHover};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.focused};
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

export default HomePostInfos;
