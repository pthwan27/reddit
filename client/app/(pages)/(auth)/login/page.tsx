'use client';

import styled from 'styled-components';

import Auth from '@/app/container/auth';
import Header from '@/app/container/header';

const LoginPage = () => {
  return (
    <Login>
      <Header noOption={true} />
      <Auth />
    </Login>
  );
};
const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;
`;

export default LoginPage;
