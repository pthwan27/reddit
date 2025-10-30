'use client';

import styled from 'styled-components';

import AuthContainer from '@/app/container/auth';
import HeaderContainer from '@/app/container/headerContainer';

const Login = () => {
  return (
    <StyledAuthPage>
      <HeaderContainer noOption={true} />
      <AuthContainer />
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

export default Login;
