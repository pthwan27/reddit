import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import styled from 'styled-components';

import { Sub } from '@/app/types';

import DownArrowIcon from '../../svgs/DownArrowIcon';
import SearchIcon from '../../svgs/SearchIcon';

interface SubSelectorProps {
  allSubs?: Sub[];
  selectedSub?: Sub;
  onSubSelect: (sub: Sub) => void;
}

const SubSelector = ({
  allSubs,
  selectedSub,
  onSubSelect,
}: SubSelectorProps) => {
  const [isSearching, setIsSearching] = useState(!!selectedSub);
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

  const handleSelect = (sub: Sub) => {
    onSubSelect(sub);
    setIsSearching(false);
    setSearchTerm('');
  };

  const startSearching = () => {
    setIsSearching(true);
  };

  return (
    <SelectorWrapper ref={wrapperRef}>
      <SearchInputWrapper $isSearching={isSearching || !selectedSub}>
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

        <DropdownMenu $isSearching={isSearching && filteredSubs !== undefined}>
          {filteredSubs && filteredSubs.length > 0 ? (
            filteredSubs.map((sub) => (
              <DropdownItem key={sub.id} onClick={() => handleSelect(sub)}>
                <IconBox $isIcon={!!sub.iconUrl}>
                  {sub.iconUrl && (
                    <Image src={sub.iconUrl} alt={sub.title} fill />
                  )}
                </IconBox>
                <span>{sub.title}</span>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem as="div" style={{ cursor: 'default' }}>
              검색 결과가 없습니다.
            </DropdownItem>
          )}
        </DropdownMenu>
      </SearchInputWrapper>

      <SelectedTagWrapper $isSearching={isSearching || !selectedSub}>
        <SelectedTag onClick={startSearching}>
          {selectedSub && (
            <>
              <IconBox $isIcon={!!selectedSub.iconUrl}>
                {selectedSub.iconUrl && (
                  <Image
                    src={selectedSub.iconUrl}
                    alt={selectedSub.title}
                    fill
                  />
                )}
              </IconBox>
              <span>{selectedSub.title}</span>
              <ArrowWrapper>
                <DownArrowIcon />
              </ArrowWrapper>
            </>
          )}
        </SelectedTag>
      </SelectedTagWrapper>
    </SelectorWrapper>
  );
};

const SelectorWrapper = styled.div`
  position: relative;
  width: 77%;
  height: var(--rem-40);
`;

const SearchInputWrapper = styled.div<{ $isSearching: boolean }>`
  position: absolute;
  width: 100%;

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
  width: 50%;
  height: var(--rem-40);

  padding: var(--spacer-xs) var(--spacer-sm);

  padding-left: var(--spacer-2-5xl);

  background: ${({ theme }) => theme.colors.grayBackground};

  border: var(--line-md) solid ${({ theme }) => theme.colors.grayBackground};

  border-radius: var(--radius-lg);

  font: var(--font-button-md);

  &:active,
  &:focus {
    border: var(--line-md) solid ${({ theme }) => theme.colors.secondaryLight};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.grayHover};
  }
`;

const SelectedTagWrapper = styled.div<{ $isSearching: boolean }>`
  position: absolute;
  width: 100%;

  opacity: ${({ $isSearching }) => ($isSearching ? 0 : 1)};
  pointer-events: ${({ $isSearching }) => ($isSearching ? 'none' : 'auto')};
  transition: opacity 0.2s ease-in-out;
`;

const SelectedTag = styled.button`
  display: flex;
  align-items: center;

  width: fit-content;
  height: var(--rem-40);

  gap: var(--spacer-sm);
  padding: var(--spacer-xs) var(--spacer-sm);

  background: ${({ theme }) => theme.colors.grayBackground};
  border: var(--line-md) solid transparent;

  border-radius: var(--radius-lg);

  font: var(--font-button-md);

  &:hover {
    background: ${({ theme }) => theme.colors.grayHover};
  }
`;
const IconBox = styled.div<{ $isIcon?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: var(--rem-24);
  height: var(--rem-24);

  border-radius: var(--radius-full);
  background-color: ${({ $isIcon, theme }) =>
    $isIcon ? 'transparent' : theme.colors.dark};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-full);
    object-fit: cover;

    background: transparent;
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
  width: 40%;

  transform-origin: top left;

  transform: ${({ $isSearching }) => ($isSearching ? 'scale(1)' : 'scale(0)')};
  opacity: ${({ $isSearching }) => ($isSearching ? 1 : 0)};
  visibility: ${({ $isSearching }) => ($isSearching ? 'visible' : 'hidden')};
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.border};

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
    background-color: ${({ theme }) => theme.colors.grayHover};
  }
`;
export default SubSelector;
