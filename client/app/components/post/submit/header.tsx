import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import { Sub } from '@/app/types';

import SubSelector from './subSelector';

interface PostSubmitHeaderProps {
  isTagLoading: boolean;
  setIsTagLoading: (loading: boolean) => void;
  onSelectTag: (sub: Sub) => void;
}

const PostSubmitHeader = ({
  isTagLoading,
  onSelectTag,
}: PostSubmitHeaderProps) => {
  const { selectedSub, subs } = useSubStore();

  return (
    <StyledPostSubmitHeader>
      <TitleSection>
        <h1>게시물 만들기</h1>
      </TitleSection>

      <SubSelector
        allSubs={subs}
        selectedSub={selectedSub}
        onSubSelect={onSelectTag}
        isTagLoading={isTagLoading}
      />
    </StyledPostSubmitHeader>
  );
};

const StyledPostSubmitHeader = styled.header`
  display: flex;
  flex-direction: column;

  gap: var(--spacer-md);
  margin-left: var(--spacer-md);
  margin-bottom: var(--spacer-2xs);

  h1 {
    padding: var(--spacer-4xs);
    font: var(--font-title-h2);
    color: ${({ theme }) => theme.colors.neutral.contentStrong};
  }
`;
const TitleSection = styled.div`
  display: flex;
`;

export default PostSubmitHeader;
