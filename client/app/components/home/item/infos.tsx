import formatTimeAgo from '@/app/utils/formatTimeAgo';

import styled from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import EtcIcon from '../../svgs/EtcIcon';

const HomePostInfos = ({ ...post }: Post) => {
  const goToSub = (e: React.MouseEvent) => {
    e.stopPropagation();

    //가입 기능 구현 -> sub 페이지에서도 사용 예정
  };

  return (
    <StyledHomePostInfos>
      <div>
        <IconBox
          iconUrl={post.sub.iconUrl}
          altText={post.sub.title}
          width={24}
          height={24}
        />
        <span>r/{post.sub.title}</span>
        <span>•</span>
        <span>{formatTimeAgo(post.createdAt)}</span>
      </div>
      <IconsWrapper>
        <RegisterButton onClick={goToSub}>가입</RegisterButton>
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

const IconsWrapper = styled.div``;

const RegisterButton = styled.button`
  height: var(--rem-24);

  padding: 0 11px;

  border-radius: var(--radius-lg);

  font: var(--font-12-16-bold);
  line-height: 1;

  background: ${({ theme }) => theme.colors.primary.background};
  color: ${({ theme }) => theme.colors.global.white};
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
