import styled from 'styled-components';

import { useAuth } from '@/app/context/authContext';

import LoginContainer from './login';
import RegisterContainer from './register';

const Auth = () => {
  const { mode } = useAuth();
  return (
    <AuthContainer>
      {mode === 'login' ? <LoginContainer /> : <RegisterContainer />}
    </AuthContainer>
  );
};

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: var(--radius-xl);

  background: ${({ theme }) => theme.colors.neutral.background};

  width: 528px;
  min-width: 320px;
  min-height: 400px;

  padding: var(--spacer-3xl) var(--spacer-5xl);
  box-shadow: var(--box-shadow);
`;

export default Auth;
