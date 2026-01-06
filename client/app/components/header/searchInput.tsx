import { useEffect, useState } from 'react';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import IconBox from '../common/IconBox';
import DarkCloseIcon from '../svgs/DarkCloseIcon';
import SearchIcon from '../svgs/SearchIcon';

const SearchInput = () => {
  const { selectedSub } = useSubStore();

  const [isTagVisible, setIsTagVisible] = useState(selectedSub !== null);

  useEffect(() => {
    setIsTagVisible(selectedSub !== null);
  }, [selectedSub]);

  return (
    <StyledSearchInput>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <InputWrapper id="search-input">
        {selectedSub && isTagVisible && (
          <Tag>
            <IconBox iconUrl={selectedSub.iconUrl} width={16} height={16} />
            <span>{selectedSub.title}</span>
            <IconBox
              icon={<DarkCloseIcon />}
              width={16}
              height={16}
              onClick={() => setIsTagVisible(false)}
            />
          </Tag>
        )}
        <Input
          name="search-input"
          placeholder={`${selectedSub ? '검색 범위 : ' + selectedSub.title : 'Search'}`}
        />
      </InputWrapper>
    </StyledSearchInput>
  );
};

const StyledSearchInput = styled.label`
  display: flex;
  position: relative;

  width: 100%;

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

const InputWrapper = styled.div`
  display: flex;
  width: 100%;

  background: ${({ theme }) => theme.colors.secondary.background};

  border: var(--line-md) solid transparent;
  padding-left: var(--spacer-2-5xl);
  border-radius: var(--radius-full);

  box-shadow: var(--box-shadow-xs);

  &:focus-within {
    border: var(--line-md) solid ${({ theme }) => theme.colors.default.primary};
    background: 0 0;
  }

  &:active,
  &:hover {
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);

  padding: var(--spacer-2xs) var(--spacer-sm);
  margin: var(--spacer-4xs) 0;

  border-radius: var(--radius-full);

  font: var(--font-12-16-semibold);
  line-height: 1.5;

  background-color: ${({ theme }) =>
    theme.components.button.background.activated};

  height: var(--rem-32);

  > span {
    display: flex;
    align-items: center;
    line-height: 1.5;
  }
`;

const Input = styled.input`
  padding: 6px var(--spacer-xs);

  font: var(--font-14-20-regular);

  color: ${({ theme }) => theme.colors.neutral.contentStrong};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.contentWeak};
  }
`;

export default SearchInput;
