import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import { useAuth } from '@/app/context/authContext';
import { ModalKey, useModalState } from '@/app/context/modalContext';

import IconButton from '../common/button/iconButton';
import LoadingSpinner from '../common/loadingSpinner';
import PlusIcon from '../svgs/PlusIcon';
import CollapsibleList from './collapsibleList';

const LoginNavMenu = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { open } = useModalState();
  const modalKey: ModalKey = 'createSubModal';

  const { filterdSub, loading } = useSubStore();

  const onOpenCreateSubModal = () => {
    if (!user) return;

    open(modalKey);
  };

  const goToSubDetail = (subId: number) => {
    router.push(`/sub/r/${subId}`);
  };

  return (
    <CollapsibleList title="커뮤니티">
      <IconButton
        icon={<PlusIcon />}
        value={'커뮤니티 만들기'}
        onClick={() => onOpenCreateSubModal()}
      />

      <StyledSubList>
        {loading ? (
          <LoadingSpinner />
        ) : (
          filterdSub.map((sub, idx) => (
            <StyledSubItem
              key={sub.title + idx}
              onClick={() => goToSubDetail(sub.id)}
            >
              <IconBox $isIcon={!!sub.iconUrl}>
                {sub.iconUrl && (
                  <Image src={sub.iconUrl} alt={sub.title} fill />
                )}
              </IconBox>
              {sub.title}
            </StyledSubItem>
          ))
        )}
      </StyledSubList>
    </CollapsibleList>
  );
};

const StyledSubList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-4xs);
`;

const StyledSubItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;

  gap: var(--spacer-xs);
  padding: var(--spacer-sm);

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

export default LoginNavMenu;
