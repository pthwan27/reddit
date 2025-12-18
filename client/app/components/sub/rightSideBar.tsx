'use client';

import styled from 'styled-components';

const RightSideBar = () => {
  return (
    <StyledRightSideBar>
      <RightSideBarWrapper>Sidebar Item</RightSideBarWrapper>
    </StyledRightSideBar>
  );
};

const StyledRightSideBar = styled.aside`
  padding: var(--spacer-md) 0;
`;

const RightSideBarWrapper = styled.div`
  height: 100%;
  padding: var(--spacer-sm);
  background: ${({ theme }) => theme.colors.global.orangered};

  @media (min-width: 768px) {
    margin: var(--spacer-md) 0;
  }
`;

export default RightSideBar;
