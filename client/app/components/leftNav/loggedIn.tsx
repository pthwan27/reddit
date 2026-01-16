import styled from 'styled-components';

import IconBox from '@/app/components/common/IconBox';

import { Sub } from '@/app/types';

import IconButton from '../common/button/iconButton';
import CollapsibleList from '../common/collapsibleList';
import Skeleton from '../common/loading/skeleton';
import CommunityFill from '../svgs/CommunityFill';
import SettingIcon from '../svgs/SettingIcon';

interface LoggedInProps {
  subscribeSubs: Sub[];
  loading: boolean;
  goToSubDetail: (sub: Sub) => void;
}
const LoggedIn = ({ subscribeSubs, loading, goToSubDetail }: LoggedInProps) => {
  return (
    <CollapsibleList
      title={<CollapsibleListTitle>커뮤니티</CollapsibleListTitle>}
    >
      <IconButton
        variant="neutral"
        icon={<SettingIcon />}
        value={'커뮤니티 관리'}
      />
      <SubList>
        {loading ? (
          <SkeletonWrapper>
            {Array.from({ length: subscribeSubs.length || 5 }).map((_, idx) => (
              <SkeletonItemWrapper key={idx}>
                <Skeleton />
              </SkeletonItemWrapper>
            ))}
          </SkeletonWrapper>
        ) : (
          subscribeSubs.map((sub: Sub, idx: number) => (
            <SubItem key={sub.title + idx} onClick={() => goToSubDetail(sub)}>
              {sub.iconUrl ? (
                <IconBox
                  iconUrl={sub.iconUrl}
                  altText={sub.title}
                  width={32}
                  height={32}
                />
              ) : (
                <IconBox
                  icon={<CommunityFill />}
                  altText={sub.title}
                  width={32}
                  height={32}
                />
              )}
              <TitleBox>{`r/${sub.title}`}</TitleBox>
            </SubItem>
          ))
        )}
      </SubList>
    </CollapsibleList>
  );
};
const CollapsibleListTitle = styled.span`
  position: relative;
  display: flex;
  align-items: center;

  height: var(--rem-40);
  letter-spacing: 0.1em;

  padding: var(--spacer-2xs) 0;
`;

const SubList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-4xs);
`;

const SkeletonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const SkeletonItemWrapper = styled.div`
  height: var(--rem-40);
  padding: var(--spacer-2xs) var(--spacer-md);

  border-radius: var(--radius-md);
  border: none;
`;

const SubItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;

  gap: var(--spacer-xs);
  padding: var(--spacer-2xs) var(--spacer-md);

  border-radius: var(--radius-md);
  border: none;

  color: ${({ theme }) => theme.colors.neutral.contentStrong};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
    border: transparent;
  }

  font: var(--font-14);

  > div {
    cursor: pointer;
  }
`;

const TitleBox = styled.span`
  color: ${({ theme }) => theme.colors.default.secondary};
`;

export default LoggedIn;
