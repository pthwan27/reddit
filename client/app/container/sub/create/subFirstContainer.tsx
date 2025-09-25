import { use, useState } from 'react';

import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/placeholderInput';
import PlaceHolderTextarea from '@/app/components/common/placeholderTextarea';

const CreateSubSecContainer = () => {
  const [c, setC] = useState('');
  return (
    <InputBox>
      <PlaceHolderInput
        label="커뮤니티 이름"
        value={c}
        type="text"
        maxLength={21}
        required={true}
        isExtraContainerVisible={false}
        onChange={(e) => setC(e.target.value)}
      />
      <PlaceHolderTextarea
        label="커뮤니티 설명"
        value={c}
        maxLength={300}
        required={false}
        isExtraContainerVisible={false}
        onChange={(e) => setC(e.target.value)}
      />
    </InputBox>
  );
};
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-md);
`;

export default CreateSubSecContainer;
