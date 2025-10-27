import { useState } from 'react';

import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/input/placeholderInput';

const SubmitPostMain = () => {
  const [title, setTitle] = useState('');

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
    </StyledMainContainer>
  );
};

const StyledMainContainer = styled.main`
  padding: var(--rem-16);
`;

export default SubmitPostMain;
