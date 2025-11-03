import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

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
    router.push(`/${sub.profileUser ? 'user' : 'r'}/${sub.slug}`);
  };

  return (
    <CollapsibleList title="커뮤니티">
      <IconButton
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
              <IconBox $isIcon={!!sub.iconUrl}>
                {sub.iconUrl && (
                  <Image src={sub.iconUrl} alt={sub.title} fill />
                )}
              </IconBox>
              <TitleBox>{sub.title}</TitleBox>
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

  &:hover {
    background: ${({ theme }) => theme.colors.contentHover};
  }

  font: var(--font-14);
`;

const IconBox = styled.div<{ $isIcon?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  width: var(--rem-32);
  height: var(--rem-32);

  min-width: var(--rem-32);
  min-height: var(--rem-32);

  background-color: ${({ $isIcon, theme }) =>
    $isIcon ? 'transparent' : theme.colors.dark};

  border-radius: var(--radius-full);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;

    border-radius: var(--radius-full);
    object-fit: cover;

    background: transparent;
  }
`;

const TitleBox = styled.span``;

export default LoggedInContainer;
