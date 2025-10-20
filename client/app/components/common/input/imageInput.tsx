import { InputHTMLAttributes, useRef } from 'react';

import styled from 'styled-components';

import ImageIcon from '../../svgs/ImageIcon';

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onFileChange: (file: File | null) => void;
  value?: string;
  accept?: string;
}
const ImageInput = ({ label, onFileChange, value }: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    onFileChange(file);
  };
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileChange(null);
  };
  return (
    <StyledInputContainer>
      <InputContainer onClick={handleClick}>
        <StyledLabel>{label}</StyledLabel>
        {value ? (
          <SelectedFile>
            <FileName>{value}</FileName>
            <RemoveButton
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              ✕
            </RemoveButton>
          </SelectedFile>
        ) : (
          <PlaceholderText>
            <ImageIcon />
            <span>선택</span>
          </PlaceholderText>
        )}
      </InputContainer>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="image/*"
      />
    </StyledInputContainer>
  );
};

const StyledInputContainer = styled.div`
  display: flex;
  gap: var(--space-sm);
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacer-md) var(--spacer-md);

  border-radius: var(--radius-lg);
  font: var(--font-16);
  cursor: pointer;

  width: 100%;
  height: var(--rem-80);

  &:hover {
    background: ${({ theme }) => theme.colors.contentHover};
  }
`;
const StyledLabel = styled.label`
  min-width: var(--rem-48);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font: var(--font-16);

  cursor: pointer;
`;

const SelectedFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileName = styled.span`
  font: var(--font-16);
  color: ${({ theme }) => theme.colors.text};

  max-width: 23ch;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const RemoveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceholderText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font: var(--font-16);
  padding: var(--spacer-2xs) var(--spacer-sm);
  background: ${({ theme }) => theme.colors.grayHover};
  color: ${({ theme }) => theme.colors.text};

  border-radius: var(--radius-lg);

  span {
    padding-top: 0.25rem;
    padding-left: 0.25rem;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;
export default ImageInput;
