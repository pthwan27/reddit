import styled from 'styled-components';

import SearchIcon from '../svgs/SearchIcon';

const SearchInput = () => {
  return (
    <StyledSearchInput>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Input id="search-input" name="search-input" placeholder="Search" />
    </StyledSearchInput>
  );
};

const StyledSearchInput = styled.label`
  position: relative;

  @media (min-width: 1200px) {
    width: 560px;
  }
  @media (min-width: 1200px) {
    display: block;
  }
  @media (min-width: 1200px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;

  background: ${({ theme }) => theme.colors.secondary.background};
  border: var(--line-md) solid transparent;
  padding-left: var(--spacer-2-5xl);
  border-radius: var(--radius-3xl);

  &:focus {
    border: var(--line-md) solid ${({ theme }) => theme.colors.default.primary};
    background: 0 0;
  }

  &:active,
  &:hover {
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }
`;

export default SearchInput;
