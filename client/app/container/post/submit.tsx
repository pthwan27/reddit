'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import SubSelector from '@/app/components/post/submit/subSelector';

import { useAuth } from '@/app/context/authContext';
import { Sub } from '@/app/types';

interface SubmitPostContainerProps {
  type: string;
  identifier: string;
}

const SubmitPostContainer = ({ identifier }: SubmitPostContainerProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const { subs } = useSubStore();

  const [selectedSub, setSelectedSub] = useState<Sub>();

  useEffect(() => {
    if (!user) return;

    if (subs.length > 0) {
      const currentSub = subs.find(
        (sub) => sub.title === decodeURIComponent(identifier)
      );
      setSelectedSub(currentSub);
    }
  }, [user, subs, identifier]);

  const handleSubSelect = (sub: Sub) => {
    setSelectedSub(sub);

    if (sub.profileUser) {
      router.push(`/user/${sub.profileUser.username}/submit`);
    } else {
      router.push(`/r/${sub.title}/submit`);
    }
  };

  return (
    <StyledSubmitPostContainer>
      <SubmitPostHeader>
        <TitleSection>
          <h1>게시물 만들기</h1>
        </TitleSection>

        <SubSelector
          allSubs={subs}
          selectedSub={selectedSub}
          onSubSelect={handleSubSelect}
        />
      </SubmitPostHeader>

      <SubmitPostMain></SubmitPostMain>
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
  display: flex;
  flex-direction: column;

  gap: var(--spacer-md);
  padding: var(--rem-20) 0 0 var(--rem-20);

  h1 {
    padding: var(--spacer-4xs);
    font: var(--font-title-h2);
    color: ${({ theme }) => theme.colors.naturalText};
  }
`;

const TitleSection = styled.div`
  display: flex;
`;

const SubmitPostMain = styled.main`
  padding: var(--rem-16);
`;

export default SubmitPostContainer;
