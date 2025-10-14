import { useAuth } from '@/app/context/authContext';
import { ModalKey, useModalState } from '@/app/context/modalContext';

import IconButton from '../common/button/iconButton';
import PlusIcon from '../svgs/PlusIcon';

const LoginNavMenu = () => {
  const { user } = useAuth();

  const { open } = useModalState();
  const modalKey: ModalKey = 'createSubModal';

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
    </>
  );
};

export default LoginNavMenu;
