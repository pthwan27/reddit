import styled from 'styled-components';

import IconBox from '@/app/components/common/IconBox';

import { Sub } from '@/app/types';

import IconButton from '../common/button/iconButton';
import LoadingSpinner from '../common/loadingSpinner';
import PlusIcon from '../svgs/PlusIcon';
import CollapsibleList from './collapsibleList';

interface LoggedInContainerProps {
  filteredSubs: Sub[];
  loading: boolean;
  onOpenCreateSubModal: () => void;
  goToSubDetail: (sub: Sub) => void;
}
const LoggedIn = ({
  filteredSubs,
  loading,
  onOpenCreateSubModal,
  goToSubDetail,
}: LoggedInContainerProps) => {
  return (
    <CollapsibleList title="커뮤니티">
      <IconButton
        variant="neutral"
        icon={<PlusIcon />}
        value={'커뮤니티 만들기'}
        onClick={() => onOpenCreateSubModal()}
      />

      <SubList>
        {loading ? (
          <LoadingSpinner />
        ) : (
          filteredSubs.map((sub: Sub, idx: number) => (
            <SubItem key={sub.title + idx} onClick={() => goToSubDetail(sub)}>
              <IconBox
                iconUrl={sub.iconUrl}
                altText={sub.title}
                width={32}
                height={32}
              />
              <TitleBox>{`r/${sub.title}`}</TitleBox>
            </SubItem>
          ))
        )}
      </SubList>
    </CollapsibleList>
  );
};

const SubList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-4xs);
`;

const SubItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;

  gap: var(--spacer-xs);
  padding: var(--spacer-2xs) var(--spacer-md);

  border-radius: var(--radius-md);
  border: none;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
    border: transparent;
  }

  font: var(--font-14);
`;

const TitleBox = styled.span`
  color: ${({ theme }) => theme.colors.default.secondary};
`;

export default LoggedIn;
