'use client';

import styled from 'styled-components';

import { Sub } from '@/app/types';

const RightSideBar = ({ sub }: { sub: Sub }) => {
  return (
    <StyledRightSideBar>
      Right Side Bar Content for {sub.title}
    </StyledRightSideBar>
  );
};

const StyledRightSideBar = styled.aside`
  width: var(--rem-320);
  background-color: ${({ theme }) => theme.colors.primary};
`;

export default RightSideBar;
