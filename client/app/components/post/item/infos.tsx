import { useState } from 'react';

import formatTimeAgo from '@/app/utils/formatTimeAgo';

import styled from 'styled-components';

import { Post } from '@/app/types';

import IconBox from '../../common/IconBox';
import Dropdown from '../../common/dropdown';
import DeleteIcon from '../../svgs/DeleteIcon';
import EtcIcon from '../../svgs/EtcIcon';
import SaveIcon from '../../svgs/SaveIcon';

const PostInfos = ({ ...post }: Post) => {
  const [isEtcOpen, setIsEtcOpen] = useState(false);

  const toggleEtcOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEtcOpen((prev) => !prev);
  };

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
      <IconWrapper onClick={(e) => toggleEtcOpen(e)}>
        <IconBox icon={<EtcIcon />} width={32} height={32} percentage={50} />
        <Dropdown
          isDropdownOpen={isEtcOpen}
          dropdownItems={[
            <DropdownItem key="save">
              <IconBox icon={<SaveIcon />} width={20} height={20} />
              <span>저장</span>
            </DropdownItem>,
            post.sub.isOwner && (
              <DropdownItem key="delete">
                <IconBox icon={<DeleteIcon />} width={20} height={20} />
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

    > span:nth-child(2) {
      font: var(--font-12-16-bold);

      color: ${({ theme }) => theme.colors.neutral.content};
    }

    > span:nth-child(3),
    > span:nth-child(4) {
      color: ${({ theme }) => theme.colors.neutral.contentWeak};
    }
  }
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

  > svg {
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

  white-space: nowrap;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }

  > span {
    display: flex;
    align-items: center;

    font: var(--font-14);

    height: var(--rem-32);
    padding: 0 6px;
    color: ${({ theme }) => theme.colors.default.secondary};
  }
`;

export default PostInfos;
