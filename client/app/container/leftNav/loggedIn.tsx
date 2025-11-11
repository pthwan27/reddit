import { useRouter } from 'next/navigation';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import IconBox from '@/app/components/common/IconBox';

import { useAuth } from '@/app/context/authContext';
import { ModalKey, useModalState } from '@/app/context/modalContext';
import { Sub } from '@/app/types';

import IconButton from '../../components/common/button/iconButton';
import LoadingSpinner from '../../components/common/loadingSpinner';
import CollapsibleList from '../../components/leftNav/collapsibleList';
import PlusIcon from '../../components/svgs/PlusIcon';

const LoggedInContainer = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { open } = useModalState();
  const modalKey: ModalKey = 'createSubModal';

  const { filteredSubs, loading } = useSubStore();

  const onOpenCreateSubModal = () => {
    if (!user) return;

    open(modalKey);
  };

  const goToSubDetail = (sub: Sub) => {
    router.push(`/r/${sub.slug}`);
  };

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

export default LoggedInContainer;
