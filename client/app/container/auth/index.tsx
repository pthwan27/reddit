import styled from 'styled-components';

import { useAuth } from '@/app/context/authContext';

import LoginContainer from './loginContainer';
import RegisterContainer from './registerContainer';

const AuthContainer = () => {
  const { mode } = useAuth();
  return (
    <Auth>{mode === 'login' ? <LoginContainer /> : <RegisterContainer />}</Auth>
  );
};

const Auth = styled.div`
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

export default AuthContainer;
