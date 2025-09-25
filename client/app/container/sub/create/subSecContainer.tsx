import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/placeholderInput';
import PlaceHolderTextarea from '@/app/components/common/placeholderTextarea';

const CreateSubFirstContainer = () => {
  return (
    <InputBox>
      <PlaceHolderInput
        label="커뮤니티 이름"
        value=""
        type="text"
        required={true}
        onChange={(e) => {}}
      />
      <PlaceHolderTextarea
        label="커뮤니티 설명"
        value=""
        required={false}
        onChange={(e) => {}}
      />
    </InputBox>
  );
};
const InputBox = styled.div`
  display: flex;
`;

export default CreateSubFirstContainer;
