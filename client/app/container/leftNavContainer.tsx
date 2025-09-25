import styled from 'styled-components';

import { ModalKey, useModalState } from '../context/modalContext';
import CreateSubModal from './modal/createSubModal';

const LeftNaveContainer = () => {
  const { open } = useModalState();
  const modalKey: ModalKey = 'createSubModal';

  return (
    <StyledLeftNavContainer>
      <button onClick={() => open(modalKey)}>create sub</button>
      <StyledLeftNavDivider />

      <CreateSubModal />
    </StyledLeftNavContainer>
  );
};

const StyledLeftNavContainer = styled.nav`
  border-right: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};

  @media (max-width: 1199px) {
    display: none;
  }
`;

const StyledLeftNavDivider = styled.div`
  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};
`;
export default LeftNaveContainer;
