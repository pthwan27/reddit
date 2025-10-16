import styled from 'styled-components';

import BaseModal from '@/app/container/modal/base';

import { useAuth } from '@/app/context/authContext';
import { ModalKey } from '@/app/context/modalContext';

import LoginContainer from '../auth/loginContainer';
import RegisterContainer from '../auth/registerContainer';

const AuthModal = () => {
  const { mode } = useAuth();
  const modalKey: ModalKey = 'authModal';

  return (
    <BaseModal modalkey={modalKey} width="528px">
      <AuthModalContainer>
        {mode === 'login' ? <LoginContainer /> : <RegisterContainer />}
      </AuthModalContainer>
    </BaseModal>
  );
};

const AuthModalContainer = styled.div`
  width: 100%;
  padding: 0 var(--spacer-4xl);
`;
export default AuthModal;
