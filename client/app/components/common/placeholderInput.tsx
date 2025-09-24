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
  border: var(--line-md) solid ${({ theme }) => theme.colors.grayBackground};
  border-radius: var(--radius-lg);
  background: ${({ theme }) => theme.colors.grayBackground};

  &:focus-within {
    background: ${({ theme }) => theme.colors?.grayHover};
    border-color: ${({ theme }) => theme.colors?.secondaryLight};
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
  font-size: ${({ isFloated }) =>
    isFloated ? "var(--rem-12)" : "var(--rem-16)"};
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

const StyledInput = styled.input<{ isFloated: boolean }>`
  width: 100%;
  padding: 0 var(--spacer-md);
  font-size: var(--font-16);
  background: transparent;
  z-index: 2;
`;

const TrailingIconsContainer = styled.span`
  display: flex;
  align-items: center;
  gap: var(--rem-8);
  min-width: var(--rem-40);
`;

const TrailingIconsValidation = styled.span`
  display: flex;
  align-items: center;
`;

const TrailingIconsGeneral = styled.span`
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
  color: ${({ theme }) => theme.colors?.textMuted || "#666"};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors?.grayHover || "#f0f0f0"};
  }
`;

export default PlaceHolderInput;
