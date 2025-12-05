import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/input/placeholderInput';
import PlaceHolderTextarea from '@/app/components/common/input/placeholderTextarea';

type CreateSubFirstProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
};
const FirstCreateSub = ({
  title,
  setTitle,
  desc,
  setDesc,
}: CreateSubFirstProps) => {
  return (
    <InputBox>
      <PlaceHolderInput
        variant="primary"
        label="커뮤니티 이름"
        value={title}
        type="text"
        maxLength={19}
        required={true}
        isExtraWrapperVisible={false}
        onChange={(e) => setTitle(e.target.value)}
      />
      <PlaceHolderTextarea
        variant="primary"
        label="커뮤니티 설명"
        value={desc}
        maxLength={300}
        required={true}
        isExtraWrapperVisible={false}
        onChange={(e) => setDesc(e.target.value)}
      />
    </InputBox>
  );
};
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-md);
  width: 100%;
`;

export default FirstCreateSub;
