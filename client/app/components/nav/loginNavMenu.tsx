import { useAuth } from '@/app/context/authContext';
import { ModalKey, useModalState } from '@/app/context/modalContext';

const LoginNavMenu = () => {
  const { user } = useAuth();

  const { open } = useModalState();
  const modalKey: ModalKey = 'createSubModal';

  const onOpenCreateSubModal = () => {
    if (user) return;

    open(modalKey);
  };
  return (
    <div>
      <button onClick={() => onOpenCreateSubModal()}>create sub</button>
    </div>
  );
};

export default LoginNavMenu;
