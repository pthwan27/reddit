import { useSubs } from '@/app/hooks/useSubs';

import styled from 'styled-components';

import { useAuth } from '@/app/context/authContext';
import { ModalKey, useModalState } from '@/app/context/modalContext';

import IconButton from '../common/button/iconButton';
import PlusIcon from '../svgs/PlusIcon';

const LoginNavMenu = () => {
  const { user } = useAuth();

  const { open } = useModalState();
  const modalKey: ModalKey = 'createSubModal';

  const { subs } = useSubs();

  const onOpenCreateSubModal = () => {
    if (!user) return;

    open(modalKey);
  };

  return (
    <>
      <IconButton
        icon={<PlusIcon />}
        value={'커뮤니티 만들기'}
        onClick={() => onOpenCreateSubModal()}
      />
      <StyledDivider />
      <ul>
        {subs.map((sub, idx) => (
          <li key={sub.title + idx}>{sub.title}</li>
        ))}
      </ul>
    </>
  );
};
const StyledDivider = styled.div`
  position: absolute;

  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};
`;

export default LoginNavMenu;
