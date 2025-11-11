import { useEffect, useMemo, useRef, useState } from 'react';

import styled from 'styled-components';

import SmallLoadingSpinner from '@/app/components/common/smallLoadingSpinner';
import DownArrowIcon from '@/app/components/svgs/DownArrowIcon';
import SearchIcon from '@/app/components/svgs/SearchIcon';

import { Sub } from '@/app/types';

import IconBox from '../../common/IconBox';
import CloseIcon from '../../svgs/CloseIcon';

interface SubSelectorProps {
  allSubs?: Sub[];
  selectedSub?: Sub | null;
  onSubSelect: (sub: Sub) => void;
  isTagLoading: boolean;
}

const SubSelector = ({
  allSubs,
  selectedSub,
  onSubSelect,
  isTagLoading,
}: SubSelectorProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredSubs = useMemo(() => {
    if (searchTerm.trim() === '') {
      return allSubs;
    }

    return allSubs?.filter((sub) =>
      decodeURIComponent(sub.title)
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [allSubs, searchTerm]);

  const handleSelect = (sub: Sub) => {
    onSubSelect(sub);
    setSearchTerm('');
    setIsSearching(false);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsSearching(false);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isTagLoading) {
      setIsSearching(!selectedSub);
    }
  }, [isTagLoading, selectedSub]);

  return (
    <StyledSubSelector>
      <SearchInputWrapper
        ref={wrapperRef}
        $isSearching={!isTagLoading && (isSearching || !selectedSub)}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInput
          type="text"
          placeholder="커뮤니티 검색"
          value={searchTerm || ''}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsSearching(true)}
        />

        <ClearButtonWrapper onClick={handleClear}>
          <CloseIcon />
        </ClearButtonWrapper>

        <DropdownMenu $isSearching={isSearching && filteredSubs !== undefined}>
          {filteredSubs && filteredSubs.length > 0 ? (
            filteredSubs.map((sub) => (
              <DropdownItem key={sub.id} onClick={() => handleSelect(sub)}>
                <IconBox
                  iconUrl={sub.iconUrl}
                  altText={sub.title}
                  width={24}
                  height={24}
                />
                <span>
                  {sub.profileUser
                    ? 'u' + ('/' + sub.title)
                    : 'r' + ('/' + sub.title)}
                </span>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem as="div" style={{ cursor: 'default' }}>
              검색 결과가 없습니다.
            </DropdownItem>
          )}
        </DropdownMenu>
      </SearchInputWrapper>
      <SelectedTagWrapper
        ref={wrapperRef}
        $isSearching={!isTagLoading && (isSearching || !selectedSub)}
      >
        <SelectedTag
          $isLoading={isTagLoading}
          onClick={() => setIsSearching((e) => !e)}
        >
          {isTagLoading ? (
            <LoadingSpinnerBox>
              <SmallLoadingSpinner />
            </LoadingSpinnerBox>
          ) : (
            selectedSub && (
              <>
                <IconBox
                  iconUrl={selectedSub.iconUrl}
                  altText={selectedSub.title}
                  width={24}
                  height={24}
                />
                <span>
                  {selectedSub.profileUser
                    ? 'u' + ('/' + selectedSub.title)
                    : 'r' + ('/' + selectedSub.title)}
                </span>
                <ArrowWrapper>
                  <DownArrowIcon />
                </ArrowWrapper>
              </>
            )
          )}
        </SelectedTag>
      </SelectedTagWrapper>
    </StyledSubSelector>
  );
};
const StyledSubSelector = styled.div`
  position: relative;
  height: var(--rem-40);
`;

const SearchInputWrapper = styled.div<{ $isSearching: boolean }>`
  position: absolute;
  width: 58%;

  opacity: ${({ $isSearching }) => ($isSearching ? 1 : 0)};
  pointer-events: ${({ $isSearching }) => ($isSearching ? 'auto' : 'none')};
  transition: opacity 0.2s ease-in-out;
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

const SearchInput = styled.input`
  width: 100%;
  height: var(--rem-40);

  padding: var(--spacer-xs) var(--spacer-sm);

  padding-left: var(--spacer-2-5xl);

  background: ${({ theme }) => theme.colors.secondary.background};

  border: var(--line-md) solid
    ${({ theme }) => theme.colors.secondary.background};

  border-radius: var(--radius-xl);

  font: var(--font-14-20-regular);
  color: ${({ theme }) => theme.components.button.secondary.text.default};

  &:focus {
    border: var(--line-md) solid
      ${({ theme }) => theme.colors.interactive.focused};
  }
`;
const ClearButtonWrapper = styled.button`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacer-4xs);

  border-radius: 50%;
  background: none;

  cursor: pointer;

  &:hover {
    border: none;
  }

  svg {
    width: var(--rem-12);
    height: var(--rem-12);
  }
`;

const SelectedTagWrapper = styled.div<{ $isSearching: boolean }>`
  position: absolute;
  width: 58%;

  opacity: ${({ $isSearching }) => ($isSearching ? 0 : 1)};
  pointer-events: ${({ $isSearching }) => ($isSearching ? 'none' : 'auto')};
  transition: opacity 0.2s ease-in-out;
`;

const SelectedTag = styled.button<{ $isLoading: boolean }>`
  display: flex;
  align-items: center;

  min-width: ${({ $isLoading }) => ($isLoading ? '30%' : 'fit-content')};
  width: fit-content;
  height: var(--rem-40);

  gap: var(--spacer-sm);
  padding: var(--spacer-xs) var(--spacer-sm);

  background: ${({ theme }) => theme.colors.secondary.background};
  border: var(--line-sm) solid transparent;

  border-radius: var(--radius-xl);

  font: var(--font-14);

  &:hover {
    border: var(--line-sm) solid
      ${({ theme }) => theme.colors.secondary.backgroundHover};
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }

  &:active {
    background: ${({ theme }) => theme.gradients.pressed};
  }
`;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownMenu = styled.ul<{ $isSearching: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 5%;
  width: 90%;

  padding: var(--spacer-md) 0;

  transform-origin: top left;

  transform: ${({ $isSearching }) => ($isSearching ? 'scale(1)' : 'scale(0)')};
  opacity: ${({ $isSearching }) => ($isSearching ? 1 : 0)};
  visibility: ${({ $isSearching }) => ($isSearching ? 'visible' : 'hidden')};

  overflow-y: auto;

  background: ${({ theme }) => theme.colors.neutral.background};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.border};

  border-radius: var(--radius-md);
  box-shadow: var(--box-shadow);
  list-style: none;
  z-index: 10;

  transition:
    transform 0.2s ease-out,
    opacity 0.2s ease-out,
    visibility 0.2s ease-out;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  gap: var(--spacer-sm);
  padding: var(--spacer-sm) var(--spacer-md);
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }

  span {
    font: var(--font-14);
  }
`;

const LoadingSpinnerBox = styled.div`
  position: absolute;
  width: 30%;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export default SubSelector;
