import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import { useAuth } from '@/app/context/authContext';
import { ModalKey, useModalState } from '@/app/context/modalContext';
import { useSubs } from '@/app/context/subContext';

import IconButton from '../common/button/iconButton';
import PlusIcon from '../svgs/PlusIcon';

const LoginNavMenu = () => {
  const router = useRouter();
  const { user } = useAuth();

  const { open } = useModalState();
  const modalKey: ModalKey = 'createSubModal';

  const { subs } = useSubs();

  const onOpenCreateSubModal = () => {
    if (!user) return;

    open(modalKey);
  };

  const goToSubDetail = (subId: number) => {
    router.push(`/sub/${subId}`);
  };

  return (
    <>
      <IconButton
        icon={<PlusIcon />}
        value={'커뮤니티 만들기'}
        onClick={() => onOpenCreateSubModal()}
      />
      <StyledDivider />

      <StyledSubList>
        {subs.map((sub, idx) => (
          <StyledSubItem
            key={sub.title + idx}
            onClick={() => goToSubDetail(sub.id)}
          >
            <IconBox>
              <Image src={sub.iconUrl} alt={sub.title} width={32} height={32} />
            </IconBox>
            {sub.title}
          </StyledSubItem>
        ))}
      </StyledSubList>
    </>
  );
};
const StyledDivider = styled.div`
  position: absolute;

  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};
`;

const StyledSubList = styled.div``;

const StyledSubItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;

  gap: var(--spacer-xs);
  padding: var(--spacer-sm);

  border-radius: var(--radius-lg);

  &:hover {
    background: ${({ theme }) => theme.colors.contendHover};
  }

  font: var(--font-14);
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  width: var(--rem-20);
  height: var(--rem-20);

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
