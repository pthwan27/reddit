'use client';

import styled from 'styled-components';

import LoginContainer from '@/app/container/auth/loginContainer';
import RegisterContainer from '@/app/container/auth/registerContainer';
import HeaderContainer from '@/app/container/headerContainer';

import { useAuth } from '@/app/context/authContext';

const Login = () => {
  const { mode } = useAuth();
  return (
    <StyledAuthPage>
      <HeaderContainer noOption={true} />
      <AuthContainer>
        {mode === 'login' ? <LoginContainer /> : <RegisterContainer />}
      </AuthContainer>
    </StyledAuthPage>
  );
};
const StyledAuthPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colors.darkgrayBackground};
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: var(--radius-lg);

  background: ${({ theme }) => theme.colors.background};

  width: 528px;
  min-width: 320px;
  min-height: 400px;

  padding: var(--spacer-3xl) var(--spacer-5xl);
  box-shadow: var(--box-shadow);
`;

export default Login;
