'use client';

import { useState } from 'react';

import styled from 'styled-components';

import { Sub } from '@/app/types';

import SubmitPostHeader from '../../../../components/sub/detail/submit/header';
import SubmitPostMain from '../../../../components/sub/detail/submit/main';

const SubmitPostContainer = ({ sub }: { sub: Sub }) => {
  const [isTagLoading, setIsTagLoading] = useState(false);

  return (
    <GridWrapper>
      <StyledSubmitPostContainer>
        <SubmitPostHeader
          isTagLoading={isTagLoading}
          setIsTagLoading={setIsTagLoading}
        />
        <SubmitPostMain />
        <>sub: {sub.title}</>
      </StyledSubmitPostContainer>
    </GridWrapper>
  );
};
const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 312px;
  gap: 24px;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 16px;

  @media (max-width: 959px) {
    grid-template-columns: 1fr;
    max-width: 100%;
    padding: 16px;

    & > :nth-child(2) {
      display: none; /* 사이드바 숨김 */
    }
  }
`;
const StyledSubmitPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  margin: 0 auto;

  max-width: calc(100vw - 320px);

  @media (min-width: 1200px) {
    max-width: 1120px;
  }
`;

export default SubmitPostContainer;
