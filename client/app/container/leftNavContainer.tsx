import styled from 'styled-components';

import CommonLeftNavMenu from '../components/nav/commonNavMenu';
import LoginNavMenu from '../components/nav/loginNavMenu';
import LogoutNavMenu from '../components/nav/logoutNavMenu';
import { useAuth } from '../context/authContext';
import CreateSubModal from './modal/createSubModal';

const LeftNaveContainer = ({ isVisible }: { isVisible: boolean }) => {
  const { user } = useAuth();

  return (
    <LeftNavContainer isVisible={isVisible}>
      <StyledMenuContainer>
        <CommonLeftNavMenu />
      </StyledMenuContainer>
      <StyledDivider />
      <StyledMenuContainer>
        {user ? <LoginNavMenu /> : <LogoutNavMenu />}
      </StyledMenuContainer>
      <StyledDivider />

      <CreateSubModal />
    </LeftNavContainer>
  );
};

const LeftNavContainer = styled.nav<{ isVisible: boolean }>`
  position: relative;

  border-right: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};

  height: 100%;
  overflow-y: auto;

  z-index: 10;

  & > * {
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transition: opacity 250ms ease;
  }

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
