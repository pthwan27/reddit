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
      <PlaceHolderInput
        value={title}
        type="text"
        label="제목"
        onChange={(e) => setTitle(e.target.value)}
        bgColor="transparent"
        hoverColor="naturalHover"
        borderColor="naturalBorder"
        hoverBorderColor="naturalHoverBorder"
        focusBorderColor="secondaryLight"
        lineWidth="sm"
        required={true}
      />
      <PlaceHolderTextarea
        value={content}
        type="text"
        label="내용"
        onChange={(e) => setContent(e.target.value)}
        bgColor="transparent"
        hoverColor="naturalHover"
        borderColor="naturalBorder"
        hoverBorderColor="naturalHoverBorder"
        focusBorderColor="secondaryLight"
        lineWidth="sm"
        required={true}
      />
    </StyledPostSubmitMain>
  );
};

const StyledPostSubmitMain = styled.main`
  display: flex;
  flex-direction: column;

  margin-left: var(--spacer-md);
  margin-bottom: var(--spacer-sm);
  gap: var(--spacer-lg);
`;

export default PostSubmitMain;
