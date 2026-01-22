import Image from 'next/image';

import styled from 'styled-components';

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
              <IconBoxWrapper>
                {sub.iconUrl ? (
                  <SubIconWrapper>
                    <Image
                      src={sub.iconUrl}
                      alt={sub.title}
                      fill
                      sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
                    />
                  </SubIconWrapper>
                ) : (
                  <CommunityFill />
                )}
              </IconBoxWrapper>
              <TitleBox>{`r/${sub.title}`}</TitleBox>
            </SubItem>
          ))
        )}
      </SubList>
    </CollapsibleList>
  );
};

const CollapsibleListTitle = styled.span`
  display: flex;
  align-items: center;

  position: relative;

  height: var(--rem-40);

  padding: var(--spacer-2xs) 0;

  letter-spacing: 0.1em;
`;

const SubList = styled.div`
  display: flex;
  flex-direction: column;

  gap: var(--spacer-4xs);
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;

const SkeletonItemWrapper = styled.div`
  height: var(--rem-40);

  padding: var(--spacer-2xs) var(--spacer-md);

  border: none;
  border-radius: var(--radius-md);
`;

const SubItem = styled.button`
  display: flex;
  align-items: center;

  width: 100%;

  gap: var(--spacer-xs);
  padding: var(--spacer-2xs) var(--spacer-md);

  border: none;
  border-radius: var(--radius-md);

  font: var(--font-14);
  color: ${({ theme }) => theme.colors.neutral.contentStrong};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
    border: transparent;
  }

  > div {
    cursor: pointer;
  }
`;

const IconBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  width: var(--rem-32);
  height: var(--rem-32);

  flex-shrink: 0;
  aspect-ratio: 1 / 1;

  border-radius: var(--radius-full);

  cursor: pointer;
`;

const SubIconWrapper = styled.div`
  position: relative;

  width: 90%;
  height: 90%;

  border-radius: var(--radius-full);

  overflow: hidden;
`;

const TitleBox = styled.span`
  color: ${({ theme }) => theme.colors.default.secondary};
`;

export default LoggedIn;
