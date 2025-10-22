'use client';

import { useEffect, useState } from 'react';

import { useGetSubs } from '@/app/hooks/useGetSubs';

import styled from 'styled-components';

import SubSelector from '@/app/components/post/submit/subSelector';

import { Sub } from '@/app/types';

interface SubmitPostContainerProps {
  type: string;
  identifier: string;
}

const SubmitPostContainer = ({ identifier }: SubmitPostContainerProps) => {
  const { subs } = useGetSubs();

  const [selectedSub, setSelectedSub] = useState<Sub>();

  useEffect(() => {
    if (subs.length > 0) {
      const currentSub = subs.find(
        (sub) => sub.title === decodeURIComponent(identifier)
      );
      setSelectedSub(currentSub);
    }
  }, [subs, identifier]);

  const handleSubSelect = (sub: Sub) => {
    setSelectedSub(sub);
  };

  return (
    <StyledSubmitPostContainer>
      <Header>
        <span>Submit Post</span>
      </Header>

      <Main>
        <SubSelector
          allSubs={subs}
          selectedSub={selectedSub}
          onSubSelect={handleSubSelect}
        />
      </Main>
    </StyledSubmitPostContainer>
  );
};

const StyledSubmitPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  max-width: calc(100vw - (272px, 0px));

  margin: 0 auto;

  @media (min-width: 1200px) {
    max-width: 1120px;
  }
`;

const Header = styled.header`
  padding: var(--rem-20) 0 0 var(--rem-20);

  span {
    font: var(--font-title-h1);
  }
`;

const Main = styled.main`
  padding: var(--rem-16);
`;

export default SubmitPostContainer;
