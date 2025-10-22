import styled from 'styled-components';

import SearchIcon from '../svgs/SearchIcon';

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
  width: 77%;
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: cursor;
`;

const StyledSearchInput = styled.input`
  width: 100%;

  background: ${({ theme }) => theme.colors.grayBackground};
  border: var(--line-md) solid transparent;
  padding-left: var(--spacer-2-5xl);
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
