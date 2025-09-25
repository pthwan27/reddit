import BaseModal from '@/app/container/modal/baseModal';

import { useAuth } from '@/app/context/authContext';
import { ModalKey } from '@/app/context/modalContext';

import LoginContainer from '../auth/loginContainer';
import RegisterContainer from '../auth/registerContainer';

const AuthModal = () => {
  const { mode } = useAuth();
  const modalKey: ModalKey = 'authModal';

  return (
    <BaseModal modalkey={modalKey} width="528px">
      {mode === 'login' ? <LoginContainer /> : <RegisterContainer />}
    </BaseModal>
  );
};

export default AuthModal;
