import styled from "styled-components";
import SearchIcon from "../svgs/SearchIcon";

const SearchInput = () => {
  return (
    <SearchInputWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledSearchInput placeholder="Search" />
    </SearchInputWrapper>
  );
};

const SearchInputWrapper = styled.div`
  position: relative;
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: cursor;
`;

const StyledSearchInput = styled.input`
  background: ${({ theme }) => theme.colors.grayBackground};
  border: var(--line-md) solid ${({ theme }) => theme.colors.grayBackground};

  padding-left: var(--spacer-2xl);
  border-radius: var(--radius-xl);

  &:active,
  &:focus {
    border: var(--line-md) solid ${({ theme }) => theme.colors.secondaryLight};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.grayHover};
  }
`;

export default SearchInput;
