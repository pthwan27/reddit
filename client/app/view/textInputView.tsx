import styled from "styled-components";

type textInputViewProps = {
  text: string;
  placeHolderText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInputView = ({
  text,
  placeHolderText,
  onChange,
}: textInputViewProps) => {
  return (
    <StyledInput
      type="text"
      value={text}
      placeholder={placeHolderText}
      onChange={(e) => onChange(e)}
    />
  );
};

const StyledInput = styled.input`
  padding: var(--spacer-sm) var(--spacer-md);

  border: var(--line-md) solid ${({ theme }) => theme.colors.border};
  border-radius: var(--radius-lg);

  font-size: var(--font-16);
  margin: var(--spacer-xs) 0;

  width: 88%;

  background: ${({ theme }) => theme.colors.grayBackground};

  transition: background 0.2s, color 0.2s, border 0.2s;

  &:focus {
    border: var(--line-md) solid ${({ theme }) => theme.colors.secondaryLight};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.grayHover};
  }
`;

export default TextInputView;
