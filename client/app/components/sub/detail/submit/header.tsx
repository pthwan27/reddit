import { useRouter } from 'next/navigation';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import SubSelector from '@/app/components/sub/detail/submit/subSelector';

import { Sub } from '@/app/types';

interface SubmitPostHeaderProps {
  isTagLoading: boolean;
  setIsTagLoading: (loading: boolean) => void;
}

const SubmitPostHeader = ({
  isTagLoading,
  setIsTagLoading,
}: SubmitPostHeaderProps) => {
  const router = useRouter();
  const { subs, selectedSub, setSelectedSub } = useSubStore();

  const handleSubSelect = (sub: Sub) => {
    setSelectedSub(sub);

    if (sub.id !== selectedSub?.id) {
      setIsTagLoading(true);

      setTimeout(() => {
        router.push(`/${sub.profileUser ? 'user' : 'r'}/${sub.slug}/submit`);
      }, 500);
    }
  };
  return (
    <StyledHeaderContainer>
      <TitleSection>
        <h1>게시물 만들기</h1>
      </TitleSection>

      <SubSelector
        allSubs={subs}
        selectedSub={selectedSub}
        onSubSelect={handleSubSelect}
        isTagLoading={isTagLoading}
      />
    </StyledHeaderContainer>
  );
};

const StyledHeaderContainer = styled.header`
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

export default SubmitPostHeader;
