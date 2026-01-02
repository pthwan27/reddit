import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/input/placeholderInput';

type CreateSubFirstProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};
const FirstCreateSub = ({ title, setTitle }: CreateSubFirstProps) => {
  return (
    <InputBox>
      <PlaceHolderInput
        variant="primary"
        label="주제"
        value={title}
        type="text"
        maxLength={19}
        required={true}
        isExtraWrapperVisible={false}
        onChange={(e) => setTitle(e.target.value)}
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
