import { InputHTMLAttributes, ReactNode, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ErrorIcon from "../svgs/ErrorIcon";
import ValidIcon from "../svgs/ValidIcon";
interface PlaceHolderInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  clearButton?: boolean;
  validationState?: "valid" | "invalid" | "none";
}

const PlaceHolderInput = ({
  value,
  required = false,
  label,
  type,
  leadingIcon,
  trailingIcon,
  clearButton = false,
  onChange,
}: PlaceHolderInputProps) => {
  const [isFloated, setIsFloated] = useState(false);

  const [isValidationState, setIsValidationState] = useState<
    "valid" | "invalid" | "none"
  >("none");

  const validationCheck = (value: string, type: string) => {
    if (!value) return "none";

    switch (type) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? "valid" : "invalid";

      case "password":
        // 최소 8자, 영문+숫자+특수문자 포함
        const passwordRegex =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(value) ? "valid" : "invalid";

      case "tel":
        // 한국 전화번호 형식
        const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;
        return phoneRegex.test(value.replace(/[^0-9]/g, ""))
          ? "valid"
          : "invalid";

      case "url":
        try {
          new URL(value);
          return "valid";
        } catch {
          return "invalid";
        }

      case "number":
        const num = Number(value);
        return !isNaN(num) && isFinite(num) ? "valid" : "invalid";

      case "text":
      default:
        return value.length >= 2 ? "valid" : "invalid";
    }
  };

  useEffect(() => {
    if (type) {
      const validationResult = validationCheck(value as string, type);
      setIsValidationState(validationResult);
    }
  }, [value, type]);

  const handleClear = () => {
    if (onChange) {
      onChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <StyledLabel>
      <PlaceHolderInputContainer
        onFocus={() => setIsFloated(true)}
        onBlur={() => setIsFloated(false)}
        isFloated={isFloated}
      >
        <BoundaryBox isFloated={isFloated}>
          <InputContainer hasLeadingIcon={!!leadingIcon}>
            <PlaceHolderSpan isFloated={isFloated || Boolean(value)}>
              {label}
              {required && (
                <RequiredAsterisk aria-hidden="true">*</RequiredAsterisk>
              )}
            </PlaceHolderSpan>
            <StyledInput
              id={`input-` + type}
              type={type}
              value={value}
              onChange={onChange}
              isFloated={isFloated || Boolean(value)}
            />
          </InputContainer>
          <TrailingIconsContainer id="trailing-icons-container">
            <TrailingIconsValidation id="trailing-icons-validation">
              {isValidationState === "invalid" && <ErrorIcon />}

              {isValidationState === "valid" && <ValidIcon />}
            </TrailingIconsValidation>

            <TrailingIconsGeneral id="trailing-icons-general">
              {trailingIcon}
              {clearButton && (
                <ClearButton onClick={handleClear} className="has-value">
                  ✕
                </ClearButton>
              )}
            </TrailingIconsGeneral>
          </TrailingIconsContainer>
        </BoundaryBox>
      </PlaceHolderInputContainer>
    </StyledLabel>
  );
};
const StyledLabel = styled.label`
  position: relative;
  display: block;
  --left-label-position: 0px;
`;
const PlaceHolderInputContainer = styled.div<{ isFloated: boolean }>`
  position: relative;

  background: ${({ theme }) => theme.colors.grayBackground};
  border: var(--line-md) solid ${({ theme }) => theme.colors.grayBackground};
  border-radius: var(--radius-lg);

  &:focus-within {
    border-color: ${({ theme }) => theme.colors?.secondaryLight};
    background: ${({ theme }) => theme.colors?.grayHover};
  }
`;

const BoundaryBox = styled.span<{ isFloated: boolean }>`
  position: relative;
  display: inline-flex;

  flex-direction: center;

  height: var(--size-3xl);
`;

const InputContainer = styled.span<{ hasLeadingIcon: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-left: ${({ hasLeadingIcon }) => (hasLeadingIcon ? "0" : "0")};
`;

const PlaceHolderSpan = styled.span<{ isFloated: boolean }>`
  position: ${({ isFloated }) => (isFloated ? "relative" : "absolute")};

  top: ${({ isFloated }) => (isFloated ? "0" : "50%")};
  transform: ${({ isFloated }) => (isFloated ? "none" : "translateY(-50%)")};
  font-size: ${({ isFloated }) => (isFloated ? "12px" : "16px")};

  padding: 0 var(--spacer-md);

  color: ${({ theme }) => theme.colors.textMuted};

  z-index: 1;

  transition: all 0.2s;
`;

const RequiredAsterisk = styled.span`
  color: #dc3545;
  padding-top: var(--spacer-xs);
  margin-left: 2px;
`;

const StyledInput = styled.input<{ isFloated: boolean }>`
  width: 100%;
  font-size: var(--font-16);

  padding: 0 var(--spacer-md);
  background: transparent;

  z-index: 2;
`;

const TrailingIconsContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 40px;
`;

const TrailingIconsValidation = styled.span`
  display: flex;
  align-items: center;
`;

const TrailingIconsGeneral = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors?.textMuted || "#666"};

  &:hover {
    background: ${({ theme }) => theme.colors?.grayHover || "#f0f0f0"};
  }
`;

export default PlaceHolderInput;
