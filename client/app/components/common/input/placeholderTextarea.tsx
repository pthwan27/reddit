import { InputHTMLAttributes, ReactNode, useState } from 'react';

import styled from 'styled-components';

import ErrorIcon from '../../svgs/ErrorIcon';
import ValidIcon from '../../svgs/ValidIcon';

interface PlaceHolderInputProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  leadingIcon?: ReactNode;
  ExtraIcon?: ReactNode;
  clearButton?: boolean;
  isExtraContainerVisible?: boolean;
  validationState?: 'valid' | 'invalid' | 'none' | false;
}

const PlaceHolderTextarea = ({
  value,
  required = false,
  label,
  type,
  maxLength,
  leadingIcon,
  ExtraIcon,
  clearButton = false,
  isExtraContainerVisible = true,
  onChange,
  validationState,
}: PlaceHolderInputProps) => {
  const [isFloated, setIsFloated] = useState(false);

  const handleClear = () => {
    if (onChange) {
      onChange({
        target: { value: '' },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  };

  return (
    <StyledInputContainer>
      <PlaceHolderInputContainer
        onFocus={() => setIsFloated(true)}
        onBlur={() => setIsFloated(false)}
      >
        <BoundaryBox>
          <InputContainer $hasLeadingIcon={!!leadingIcon}>
            <PlaceHolderSpan $isFloated={isFloated || Boolean(value)}>
              {label}
              {required && (
                <RequiredAsterisk aria-hidden="true">*</RequiredAsterisk>
              )}
            </PlaceHolderSpan>
            <StyledTextarea
              id={`input-` + type}
              value={value}
              maxLength={maxLength}
              onChange={onChange}
            />
          </InputContainer>
          {isExtraContainerVisible && (
            <ExtraIconContainer id="Extra-icons-container">
              <ExtraIconsValidation id="Extra-icons-validation">
                {validationState === 'invalid' && <ErrorIcon />}

                {validationState === 'valid' && <ValidIcon />}

                {(validationState === 'none' || false) && (
                  <div style={{ width: 20, height: 20 }} />
                )}
              </ExtraIconsValidation>
              <ExtraIconsGeneral id="Extra-icons-general">
                {ExtraIcon}
                {clearButton && (
                  <ClearButton onClick={handleClear}>✕</ClearButton>
                )}
              </ExtraIconsGeneral>
            </ExtraIconContainer>
          )}
        </BoundaryBox>
      </PlaceHolderInputContainer>
    </StyledInputContainer>
  );
};
const StyledInputContainer = styled.label`
  position: relative;
  display: block;
  --left-label-position: 0px;
  width: 100%;
`;

const PlaceHolderInputContainer = styled.div`
  position: relative;
  border: var(--line-md) solid ${({ theme }) => theme.colors.grayBackground};
  border-radius: var(--radius-lg);
  background: ${({ theme }) => theme.colors.grayBackground};

  &:focus-within {
    background: ${({ theme }) => theme.colors?.grayHover};
    border-color: ${({ theme }) => theme.colors?.secondaryLight};
  }
`;

const BoundaryBox = styled.span`
  position: relative;
  display: inline-flex;
  flex-direction: center;
  height: var(--rem-192);
  width: 100%;
`;

const InputContainer = styled.span<{ $hasLeadingIcon: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-left: ${({ $hasLeadingIcon }) => ($hasLeadingIcon ? '0' : '0')};
`;

const PlaceHolderSpan = styled.span<{ $isFloated: boolean }>`
  position: ${({ $isFloated }) => ($isFloated ? 'relative' : 'absolute')};
  top: ${({ $isFloated }) => ($isFloated ? '0' : '14%')};
  transform: ${({ $isFloated }) => ($isFloated ? 'none' : 'translateY(-50%)')};
  font: ${({ $isFloated }) =>
    $isFloated ? 'var(--font-12)' : 'var(--font-16)'};
  padding: 0 var(--spacer-md);
  color: ${({ theme }) => theme.colors.textMuted};
  z-index: 1;
  transition: all 0.2s;
`;

const RequiredAsterisk = styled.span`
  color: #dc3545;
  padding-top: var(--spacer-xs);
  margin-left: var(--spacer-4xs);
`;

const StyledTextarea = styled.textarea`
  padding: 0 var(--spacer-md);
  font: var(--font-16);
  background: transparent;
  z-index: 2;
  resize: none;
  height: var(--rem-192);
`;

const ExtraIconContainer = styled.span`
  display: flex;
  align-items: center;
  gap: var(--rem-8);
`;

const ExtraIconsValidation = styled.span`
  display: flex;
  align-items: center;
`;

const ExtraIconsGeneral = styled.span`
  display: flex;
  align-items: center;
  gap: var(--spacer-2xs);
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacer-2xs);
  border: none;
  border-radius: 50%;
  background: none;
  color: ${({ theme }) => theme.colors?.textMuted || '#666'};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors?.grayHover || '#f0f0f0'};
  }
`;

export default PlaceHolderTextarea;
