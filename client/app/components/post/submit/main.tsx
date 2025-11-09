import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/input/placeholderInput';

import PlaceHolderTextarea from '../../common/input/placeholderTextarea';

export interface PostSubmitMainProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
}

const PostSubmitMain = ({
  title,
  setTitle,
  content,
  setContent,
}: PostSubmitMainProps) => {
  return (
    <StyledPostSubmitMain>
      <InputTypeSelector></InputTypeSelector>
      <MainWrapper>
        <PlaceHolderInput
          variant="outlined"
          value={title}
          type="text"
          label="제목"
          onChange={(e) => setTitle(e.target.value)}
          bgColor="transparent"
          hoverColor="neutralHover"
          borderColor="naturalBorder"
          hoverBorderColor="neutralBorderHover"
          focusBorderColor="secondaryLight"
          lineWidth="sm"
          required={true}
        />
        <PlaceHolderTextarea
          variant="outlined"
          value={content}
          type="text"
          label="내용"
          onChange={(e) => setContent(e.target.value)}
          bgColor="transparent"
          hoverColor="neutralHover"
          borderColor="naturalBorder"
          hoverBorderColor="neutralBorderHover"
          focusBorderColor="secondaryLight"
          lineWidth="sm"
          required={true}
        />
      </MainWrapper>
    </StyledPostSubmitMain>
  );
};

const StyledPostSubmitMain = styled.main`
  display: flex;
  flex-direction: column;
`;
const InputTypeSelector = styled.div`
  height: var(--rem-48);
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-lg);

  padding: var(--spacer-md);
`;
export default PostSubmitMain;
