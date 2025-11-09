import { InputHTMLAttributes, ReactNode, useState } from 'react';

import styled, { DefaultTheme, css } from 'styled-components';

import ErrorIcon from '../../svgs/ErrorIcon';
import ValidIcon from '../../svgs/ValidIcon';

type InputVariant = 'neutral' | 'primary' | 'outlined';
interface PlaceHolderInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  leadingIcon?: ReactNode;
  ExtraIcon?: ReactNode;
  clearButton?: boolean;
  isExtraContainerVisible?: boolean;
  validationState?: 'valid' | 'invalid' | 'none' | false;

  variant?: InputVariant;
  bgColor?: string;
  hoverColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  focusBorderColor?: string;
  lineWidth?: 'sm' | 'md' | 'lg';
}

const PlaceHolderInput = ({
  value,
  required = false,
  label,
  type,
  maxLength,
  leadingIcon,
  ExtraIcon,
  clearButton = false,
  isExtraContainerVisible = true,
  validationState,
  onChange,

  variant = 'primary',
  bgColor,
  hoverColor,
  borderColor,
  hoverBorderColor,
  focusBorderColor,
  lineWidth = 'sm',
}: PlaceHolderInputProps) => {
  const [isFloated, setIsFloated] = useState(false);

  const handleClear = () => {
    if (onChange) {
      onChange({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <StyledInputLabel>
      <PlaceHolderInputDiv
        $variant={variant}
        $bgColor={bgColor}
        $hoverColor={hoverColor}
        $borderColor={borderColor}
        $hoverBorderColor={hoverBorderColor}
        $lineWidth={lineWidth}
        $focusBorderColor={focusBorderColor}
        onFocus={() => setIsFloated(true)}
        onBlur={() => setIsFloated(false)}
      >
        <BoundaryBox>
          <InputContainer $hasLeadingIcon={!!leadingIcon}>
            <LeadingIcon>{leadingIcon}</LeadingIcon>
            <PlaceHolderSpan $isFloated={isFloated || Boolean(value)}>
              {label}
              {required && (
                <RequiredAsterisk aria-hidden="true">*</RequiredAsterisk>
              )}
            </PlaceHolderSpan>
            <StyledInput
              id={`input-` + type}
              type={type}
              value={value}
              maxLength={maxLength}
              onChange={onChange}
            />
          </InputContainer>
          {isExtraContainerVisible && (
            <ExtraIconsContainer id="Extra-icons-container">
              <ExtraIconsValidation id="Extra-icons-validation">
                {validationState === 'invalid' && (
                  <div style={{ width: 20, height: 20 }}>
                    <ErrorIcon />
                  </div>
                )}

                {validationState === 'valid' && (
                  <div style={{ width: 20, height: 20 }}>
                    <ValidIcon />
                  </div>
                )}

                {validationState === 'none' && (
                  <div style={{ width: 20, height: 20 }} />
                )}
              </ExtraIconsValidation>

              <ExtraIconsGeneral id="Extra-icons-general">
                {ExtraIcon}
                {clearButton && (
                  <ClearButton type="button" onClick={() => handleClear()}>
                    ✕
                  </ClearButton>
                )}
              </ExtraIconsGeneral>
            </ExtraIconsContainer>
          )}
        </BoundaryBox>
      </PlaceHolderInputDiv>
    </StyledInputLabel>
  );
};

const getVariantStyles = (
  variant: InputVariant,
  theme: DefaultTheme,
  fontColor?: string,
  bgColor?: string,
  lineWidth?: 'sm' | 'md' | 'lg'
) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${bgColor || theme.components.input.secondary.default};
        color: ${fontColor || theme.colors.neutral.contentStrong};
        border: ${`var(--line-${lineWidth})`} solid transparent;

        &:hover {
          background: ${theme.components.input.secondary.hover};
          border: ${`var(--line-${lineWidth})`} solid transparent;
        }
      `;

    case 'outlined':
      return css`
        background: ${bgColor || theme.colors.secondary.background};
        color: ${fontColor || theme.colors.secondary.plain};
        border: var(--line-sm) solid ${theme.components.button.border.default};

        &:hover {
          background: ${theme.colors.neutral.backgroundHover};
          border: var(--line-sm) solid ${theme.components.button.border.hover};
        }
      `;

    case 'neutral':
    default:
      return css`
        background: ${theme.colors.neutral.background};
        color: ${fontColor || theme.colors.neutral.contentStrong};
        border: none;

        &:hover {
          border: none;
          background: ${theme.colors.neutral.backgroundHover};
        }
      `;
  }
};

const StyledInputLabel = styled.label`
  position: relative;
  display: block;
  --left-label-position: 0px;
  width: 100%;
`;

const PlaceHolderInputDiv = styled.div<{
  $variant: InputVariant;
  $fontColor?: string;
  $bgColor?: string;
  $hoverColor?: string;
  $borderColor?: string;
  $hoverBorderColor?: string;
  $focusBorderColor?: string;
  $lineWidth: 'sm' | 'md' | 'lg';
}>`
  display: flex;
  align-items: center;
  position: relative;

  border-radius: var(--radius-xl);

  ${({ $variant, theme, $fontColor, $bgColor, $lineWidth }) =>
    getVariantStyles($variant, theme, $fontColor, $bgColor, $lineWidth)}

  &:focus-within {
    background: ${({ $bgColor, theme }) => {
      if (!$bgColor) return theme.components.input;
      return theme.colors[$bgColor as keyof typeof theme.colors];
    }};

    border: var(--line-sm) solid transparent;
    outline: var(--line-md) solid
      ${({ theme, $focusBorderColor }) =>
        theme.colors[$focusBorderColor as keyof typeof theme.colors] ||
        theme.colors.interactive.focused};
  }
`;

const BoundaryBox = styled.span`
  position: relative;
  display: inline-flex;
  flex-direction: center;
  height: var(--size-3xl);
  width: 100%;
`;

const InputContainer = styled.span<{ $hasLeadingIcon: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-left: ${({ $hasLeadingIcon }) =>
    $hasLeadingIcon ? 'var(--rem-28)' : '0'};
`;
const LeadingIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  left: var(--rem-16);
`;

const PlaceHolderSpan = styled.span<{ $isFloated: boolean }>`
  position: absolute;
  left: 0;

  top: ${({ $isFloated }) => ($isFloated ? 'var(--spacer-xs)' : '50%')};
  transform: ${({ $isFloated }) => ($isFloated ? 'none' : 'translateY(-50%)')};

  font: ${({ $isFloated }) =>
    $isFloated ? 'var(--font-12)' : 'var(--font-16)'};
  padding: 0 var(--spacer-md);
  color: ${({ theme }) => theme.components.label || '#5C6C74'};
  z-index: 1;

  transition: all 0.2s;
`;

const RequiredAsterisk = styled.span`
  color: #dc3545;
  padding-top: var(--spacer-xs);
  margin-left: var(--spacer-4xs);
`;

const StyledInput = styled.input`
  margin-top: var(--spacer-md);
  padding: 0 calc(var(--spacer-md) - 0.5px);

  font: var(--font-16);
  background: transparent;
  z-index: 2;

  transition: all 0.2s;
`;

const ExtraIconsContainer = styled.span`
  display: flex;
  align-items: center;
  gap: var(--rem-8);
  min-width: var(--rem-40);
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

  color: ${({ theme }) => theme.colors?.secondary.plain || '#666'};
  cursor: pointer;

  &:hover {
    border: none;
  }
`;

export default PlaceHolderInput;
