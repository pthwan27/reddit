import styled from 'styled-components';

import CommonLeftNavMenu from '../components/nav/commonNavMenu';
import LoginNavMenu from '../components/nav/loginNavMenu';
import LogoutNavMenu from '../components/nav/logoutNavMenu';
import { useAuth } from '../context/authContext';
import CreateSubModal from './modal/createSubModal';

const LeftNaveContainer = () => {
  const { user } = useAuth();

  return (
    <StyledLeftNavContainer>
      <StyledMenuContainer>
        <CommonLeftNavMenu />
      </StyledMenuContainer>
      <StyledDivider />
      <StyledMenuContainer>
        {user ? <LoginNavMenu /> : <LogoutNavMenu />}
      </StyledMenuContainer>
      <StyledDivider />

      <CreateSubModal />
    </StyledLeftNavContainer>
  );
};

const StyledLeftNavContainer = styled.nav`
  border-right: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};

  height: 100%;
  overflow-y: auto;

  @media (max-width: 1199px) {
    display: none;
  }
`;

const StyledMenuContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: var(--spacer-2xs);

  padding: var(--spacer-sm);
`;

const StyledDivider = styled.div`
  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};
`;

export default LeftNaveContainer;
