import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import SubSelector from './subSelector';

interface SubmitPostHeaderProps {
  isTagLoading: boolean;
  setIsTagLoading: (loading: boolean) => void;
  onSelectTag: (sub: Sub) => void;
}

const SubmitPostHeader = ({
  isTagLoading,
  onSelectTag,
}: SubmitPostHeaderProps) => {
  const { selectedSub, subs } = useSubStore();

  return (
    <StyledHeaderContainer>
      <TitleSection>
        <h1>게시물 만들기</h1>
      </TitleSection>

      <SubSelector
        allSubs={subs}
        selectedSub={selectedSub}
        onSubSelect={onSelectTag}
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
