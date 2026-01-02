import styled from 'styled-components';

import ImageInput from '@/app/components/common/input/imageInput';

type CreateSubFourthProps = {
  banner: File | null;
  setBanner: React.Dispatch<React.SetStateAction<File | null>>;
  icon: File | null;
  setIcon: React.Dispatch<React.SetStateAction<File | null>>;
};
const FourthCreateSub = ({
  banner,
  setBanner,
  icon,
  setIcon,
}: CreateSubFourthProps) => {
  return (
    <InputBox>
      <ImageInput
        label="배너"
        value={banner?.name}
        type="file"
        onFileChange={setBanner}
      />
      <ImageInput
        label="아이콘"
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
  justify-content: center;
  gap: var(--spacer-md);
  width: 100%;
`;

export default FourthCreateSub;
