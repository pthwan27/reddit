import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/placeholderInput';
import PlaceHolderTextarea from '@/app/components/common/placeholderTextarea';

type CreateSubSecContainerProps = {
  banner: string;
  setBanner: React.Dispatch<React.SetStateAction<string>>;
  icon: string;
  setIcon: React.Dispatch<React.SetStateAction<string>>;
};
const CreateSubSecContainer = ({
  banner,
  setBanner,
  icon,
  setIcon,
}: CreateSubSecContainerProps) => {
  return (
    <InputBox>
      <PlaceHolderInput
        label="배너로 등록할 이미지를 선택해주세요."
        value={banner}
        type="text"
        maxLength={300}
        required={true}
        isExtraContainerVisible={false}
        onChange={(e) => setBanner(e.target.value)}
      />
      <PlaceHolderInput
        label="아이콘으로 등록할 이미지를 선택해주세요."
        value={icon}
        maxLength={300}
        required={false}
        isExtraContainerVisible={false}
        onChange={(e) => setIcon(e.target.value)}
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
