import styled from 'styled-components';

import { useAuth } from '../../context/authContext';
import CreateSubModal from '../modal/createSubModal';
import CommonLeftNavMenu from './commonNavMenu';
import LoginNavMenu from './loginNavMenu';
import LogoutNavMenu from './logoutNavMenu';

const LeftNavContainer = ({ isNavVisible }: { isNavVisible: boolean }) => {
  const { user } = useAuth();

  return (
    <StyledLeftNavContainer $isNavVisible={isNavVisible}>
      <StyledMenuContainer>
        <CommonLeftNavMenu />
      </StyledMenuContainer>
      <hr />
      <StyledMenuContainer>
        {user ? <LoginNavMenu /> : <LogoutNavMenu />}
      </StyledMenuContainer>
      <hr />

      <CreateSubModal />
    </StyledLeftNavContainer>
  );
};

const StyledLeftNavContainer = styled.nav<{ $isNavVisible: boolean }>`
  position: relative;

  border-right: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};

  height: 100%;

  padding: 0 var(--spacer-md);

  overflow-y: auto;

  z-index: 10;

  & > * {
    opacity: ${({ $isNavVisible }) => ($isNavVisible ? 1 : 0)};
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

export default LeftNavContainer;
