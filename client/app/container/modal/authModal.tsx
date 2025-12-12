import { useAuthStore } from '@/app/store/authStore';

import styled from 'styled-components';

import BaseModal from '@/app/container/modal/base';

import LoginContainer from '../auth/login';
import RegisterContainer from '../auth/register';

const AuthModal = () => {
  const { mode } = useAuthStore();

  return (
    <BaseModal modalkey={'authModal'} width="528px">
      <AuthModalContainer>
        {mode === 'login' ? <LoginContainer /> : <RegisterContainer />}
      </AuthModalContainer>
    </BaseModal>
  );
};

const AuthModalContainer = styled.div`
  width: 100%;
  padding: 0 var(--spacer-5xl);
`;
export default AuthModal;
