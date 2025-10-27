'use client';

import styled from 'styled-components';

import { Sub } from '@/app/types';

const RightSideBar = ({ sub }: { sub: Sub }) => {
  return (
    <StyledRightSideBarContainer>
      Right Side Bar Content for {sub.title}
    </StyledRightSideBarContainer>
  );
};

const StyledRightSideBarContainer = styled.aside`
  width: var(--rem-320);
  background-color: ${({ theme }) => theme.colors.primary};
`;

export default RightSideBar;
