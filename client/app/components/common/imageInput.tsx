import { InputHTMLAttributes, useRef, useState } from 'react';

import styled from 'styled-components';

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onFileChange: (file: File | null) => void;
  value?: string;
  accept?: string;
  preview?: boolean;
}
const ImageInput = ({
  label,
  onFileChange,
  preview = false,
  value,
  accept,
}: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('e', e);
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
      <StyledLabel>{label}</StyledLabel>
      <InputContainer onClick={handleClick}>
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
          <PlaceholderText>클릭하여 이미지를 선택하세요</PlaceholderText>
        )}
      </InputContainer>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
      />
    </StyledInputContainer>
  );
};

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;
const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  font: var(--font-14);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  font: var(--font-16);

  cursor: pointer;
`;

const SelectedFile = styled.div``;

const FileName = styled.span`
  font: var(--font-16);
  color: ${({ theme }) => theme.colors.text};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RemoveButton = styled.button``;

const PlaceholderText = styled.span`
  font: var(--font-16);
  color: ${({ theme }) => theme.colors.textMuted};
`;

const HiddenInput = styled.input`
  display: none;
`;
export default ImageInput;
