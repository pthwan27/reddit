import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import formatTimeAgo from '@/app/utils/formatTimeAgo';

import styled from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import Dropdown from '../../common/dropdown';
import ArrowBackIcon from '../../svgs/ArrowBackIcon';
import DeleteIcon from '../../svgs/DeleteIcon';
import EtcIcon from '../../svgs/EtcIcon';
import SaveIcon from '../../svgs/SaveIcon';

const CommentPostInfos = ({ ...post }: Post) => {
  const router = useRouter();

  const goToBack = () => {
    router.back();
  };

  const [isEtcOpen, setIsEtcOpen] = useState(false);

  const toggleEtcOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEtcOpen((prev) => !prev);
  };

  return (
    <StyledPostInfos>
      <PostInfoWrapper>
        <IconBox
          icon={<ArrowBackIcon />}
          width={32}
          height={32}
          percentage={50}
          backgroundColor="secondary"
          onClick={goToBack}
        />
        <PostInfo>
          <IconBox
            iconUrl={post.sub.iconUrl}
            altText={post.user.username}
            width={32}
            height={32}
          />
          <InfoWrapper>
            <Info>
              <Link href={`/r/${post.sub.slug}`}>r/{post.sub.title}</Link>
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
        <IconBox
          icon={<EtcIcon />}
          width={16}
          height={16}
          onClick={(e) => toggleEtcOpen(e)}
        />
        <Dropdown
          isDropdownOpen={isEtcOpen}
          marginTop="4xs"
          dropdownItems={[
            <DropdownItem key="save">
              <IconBox icon={<SaveIcon />} width={32} height={32} />
              <span>저장</span>
            </DropdownItem>,
            post.sub.isOwner && (
              <DropdownItem key="delete">
                <IconBox icon={<DeleteIcon />} width={32} height={32} />
                <span>삭제</span>
              </DropdownItem>
            ),
          ]}
        />
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

  > a:nth-child(1) {
    font: var(--font-12-16-bold);

    line-height: 1rem;

    color: ${({ theme }) => theme.colors.neutral.content};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.plain};
    }
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
  position: relative;

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

const DropdownItem = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  padding: var(--spacer-2xs) var(--spacer-md);

  font: var(--font-14);
  white-space: nowrap;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }

  span {
    display: flex;
    align-items: center;

    padding: 0 6px;
    color: ${({ theme }) => theme.colors.default.secondary};
  }
`;
export default CommentPostInfos;
