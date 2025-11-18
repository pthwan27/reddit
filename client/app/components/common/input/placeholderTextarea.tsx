import { InputHTMLAttributes, ReactNode, useState } from 'react';

import styled, { DefaultTheme, css } from 'styled-components';

import ErrorIcon from '../../svgs/ErrorIcon';
import ValidIcon from '../../svgs/ValidIcon';

type InputVariant = 'neutral' | 'primary' | 'outlined';
interface PlaceHolderTextareaProps
  extends InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  leadingIcon?: ReactNode;
  ExtraIcon?: ReactNode;
  clearButton?: boolean;
  isExtraContainerVisible?: boolean;
  validationState?: 'valid' | 'invalid' | 'none' | false;

  bgColor?: string;
  hoverColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  focusBorderColor?: string;
  lineWidth?: 'sm' | 'md' | 'lg';
  variant?: InputVariant;
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
  variant = 'primary',

  bgColor,
  hoverColor,
  borderColor,
  hoverBorderColor,
  focusBorderColor,
  lineWidth = 'sm',
}: PlaceHolderTextareaProps) => {
  const [isFloated, setIsFloated] = useState(false);

  const handleClear = () => {
    if (onChange) {
      onChange({
        target: { value: '' },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  };

  return (
    <StyledTextareaLabel>
      <PlaceHolderTextareaDiv
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
          <TextareaContainer $hasLeadingIcon={!!leadingIcon}>
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
          </TextareaContainer>
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
      </PlaceHolderTextareaDiv>
    </StyledTextareaLabel>
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
        border: var(--line-sm) solid ${theme.colors.neutral.border};

        &:hover {
          background: ${theme.colors.neutral.backgroundHover};
          border: var(--line-sm) solid ${theme.colors.neutral.borderMedium};
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

const StyledTextareaLabel = styled.label`
  position: relative;
  display: block;
  --left-label-position: 0px;
  width: 100%;
`;

const PlaceHolderTextareaDiv = styled.div<{
  $variant: InputVariant;
  $bgColor?: string;
  $hoverColor?: string;
  $borderColor?: string;
  $hoverBorderColor?: string;
  $focusBorderColor?: string;
  $lineWidth: 'sm' | 'md' | 'lg';
}>`
  position: relative;
  border-radius: var(--radius-xl);

  ${({ $variant, theme, $bgColor, $lineWidth }) =>
    getVariantStyles($variant, theme, undefined, $bgColor, $lineWidth)}

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
  height: var(--rem-192);
  width: 100%;
`;

const TextareaContainer = styled.span<{ $hasLeadingIcon: boolean }>`
  position: relative;

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-left: ${({ $hasLeadingIcon }) => ($hasLeadingIcon ? '0' : '0')};
`;

const PlaceHolderSpan = styled.span<{ $isFloated: boolean }>`
  position: absolute;
  left: 0;

  top: ${({ $isFloated }) => ($isFloated ? 'var(--spacer-xs)' : '14%')};
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

const StyledTextarea = styled.textarea`
  margin-top: calc(var(--spacer-lg) + 1px);
  padding: 0 calc(var(--spacer-md) - 0.5px);

  font: var(--font-16);
  background: transparent;
  z-index: 2;
  resize: none;
  height: var(--rem-192);

  overflow-y: auto;
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

  color: ${({ theme }) => theme.colors?.secondary.plain || '#666'};
  cursor: pointer;

  &:hover {
    border: none;
  }
`;

export default PlaceHolderTextarea;
