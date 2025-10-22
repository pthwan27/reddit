'use client';

import { useEffect, useState } from 'react';

import { useGetSubs } from '@/app/hooks/useGetSubs';

import styled from 'styled-components';

import SubSelector from '@/app/components/post/submit/subSelector';

import { useAuth } from '@/app/context/authContext';
import { Sub } from '@/app/types';

interface SubmitPostContainerProps {
  type: string;
  identifier: string;
}

const SubmitPostContainer = ({ identifier }: SubmitPostContainerProps) => {
  const { user } = useAuth();
  const { subs } = useGetSubs();

  const [selectedSub, setSelectedSub] = useState<Sub>();

  useEffect(() => {
    if (!user) return;

    subs.push();

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
      <SubmitPostHeader>
        <span>Submit Post</span>
      </SubmitPostHeader>

      <SubmitPostMain>
        <SubSelector
          allSubs={subs}
          selectedSub={selectedSub}
          onSubSelect={handleSubSelect}
        />
      </SubmitPostMain>
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

const SubmitPostHeader = styled.header`
  padding: var(--rem-20) 0 0 var(--rem-20);

  span {
    font: var(--font-title-h1);
  }
`;

const SubmitPostMain = styled.main`
  padding: var(--rem-16);
`;

export default SubmitPostContainer;
