'use client';

import styled from 'styled-components';

import AuthContainer from '@/app/container/auth';
import HeaderContainer from '@/app/container/headerContainer';

const Login = () => {
  return (
    <LoginPage>
      <HeaderContainer noOption={true} />
      <AuthContainer />
    </LoginPage>
  );
};
const LoginPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

export default Login;
