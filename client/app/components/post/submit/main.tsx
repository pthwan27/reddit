import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/input/placeholderInput';

import { SubmitPostProps } from '@/app/types';

import PlaceHolderTextarea from '../../common/input/placeholderTextarea';

const SubmitPostMain = ({
  title,
  setTitle,
  content,
  setContent,
}: SubmitPostProps) => {
  return (
    <StyledMainContainer>
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
    </StyledMainContainer>
  );
};

const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;

  padding: var(--rem-16);

  gap: var(--spacer-2xs);
`;

export default SubmitPostMain;
