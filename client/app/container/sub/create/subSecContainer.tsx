import styled from 'styled-components';

import ImageInput from '@/app/components/common/imageInput';

type CreateSubSecContainerProps = {
  banner: File | null;
  setBanner: React.Dispatch<React.SetStateAction<File | null>>;
  icon: File | null;
  setIcon: React.Dispatch<React.SetStateAction<File | null>>;
};
const CreateSubSecContainer = ({
  banner,
  setBanner,
  icon,
  setIcon,
}: CreateSubSecContainerProps) => {
  return (
    <InputBox>
      <ImageInput
        label="배너로 등록할 이미지를 선택해주세요."
        value={banner?.name}
        type="file"
        onFileChange={setBanner}
      />
      <ImageInput
        label="아이콘으로 등록할 이미지를 선택해주세요."
        value={icon?.name}
        type="file"
        onFileChange={setIcon}
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
