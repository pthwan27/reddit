'use client';

import styled from 'styled-components';

import { Sub } from '@/app/types';

const SubDetailContainer = ({ sub }: { sub: Sub }) => {
  return <StyledSubDetailContainer>{sub.title}</StyledSubDetailContainer>;
};

const StyledSubDetailContainer = styled.div`
  width: 100%;
  height: 100%;

  background-color: #a3a3a3ff;
`;

export default SubDetailContainer;
