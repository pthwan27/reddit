import { useState } from 'react';

import styled from 'styled-components';

import CheckMarkIcon from '@/app/components/svgs/CheckMarkIcon';
import SearchIcon from '@/app/components/svgs/SearchIcon';

import { TAGS } from '@/app/constants/tags';

interface CreateSubFirstProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}
const FirstCreateSub = ({ selectedTags, onTagToggle }: CreateSubFirstProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = TAGS.filter((tag) => {
    if (!searchTerm.trim()) return true;

    const lowerSearchTerm = searchTerm.toLowerCase();

    return (
      tag.name.includes(lowerSearchTerm) || tag.id.includes(lowerSearchTerm)
    );
  });

  return (
    <CreateSubFirstContainer>
      <SearchInput>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <InputWrapper id="search-input">
          <Input
            name="search-input"
            placeholder="주제 필터링"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputWrapper>
      </SearchInput>
      <SelectedTagCount>{`주제 ${selectedTags.length} / 3`}</SelectedTagCount>

      <Spacer />

      <TagButtonsWrapper>
        {filteredCategories.map((tag, idx) => (
          <TagButton
            key={tag.id + idx}
            isSelected={selectedTags.includes(tag.id)}
            onClick={() => onTagToggle(tag.id)}
          >
            {selectedTags.includes(tag.id) ? (
              <TagEmojiWrapper>
                <CheckMarkIcon />
              </TagEmojiWrapper>
            ) : (
              <TagEmojiWrapper />
            )}
            <span>{tag.emoji}</span>
            <span>{tag.name}</span>
          </TagButton>
        ))}
      </TagButtonsWrapper>
    </CreateSubFirstContainer>
  );
};

const CreateSubFirstContainer = styled.div`
  width: 100%;
`;

const SearchInput = styled.label`
  position: relative;
  display: flex;
  width: 100%;
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  top: 50%;
  left: 1rem;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-left: var(--spacer-2-5xl);
  background: ${({ theme }) => theme.colors.secondary.background};
  border: var(--line-md) solid transparent;
  border-radius: var(--radius-full);
  box-shadow: var(--box-shadow-xs);

  &:hover,
  &:active {
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }

  &:focus-within {
    background: transparent;
    border: var(--line-md) solid ${({ theme }) => theme.colors.default.primary};
  }
`;

const Input = styled.input`
  padding: 6px var(--spacer-2xs);
  font: var(--font-14-20-regular);
  color: ${({ theme }) => theme.colors.neutral.contentStrong};

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.contentWeak};
  }
`;

const SelectedTagCount = styled.p`
  margin: var(--spacer-xs) var(--spacer-4xs);
  font: var(--font-16-20-semibold);
`;

const TagButtonsWrapper = styled.div`
  height: 330px;
  padding: 0 var(--spacer-2xs);
  overflow-y: auto;
`;

const TagButton = styled.button<{ isSelected: boolean }>`
  margin: var(--spacer-2xs);
  height: var(--rem-32);
  display: inline-flex;

  align-items: center;
  padding: 6px var(--spacer-sm);

  border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.border};

  border-radius: var(--radius-sm);
  font: var(--font-12-16-regular);

  background: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.secondary.background : 'transparent'};

  > span:nth-child(2) {
    margin-right: var(--spacer-4xs);
  }

  &:hover {
    border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.border};

    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }

  &:active {
    border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.border};

    background: ${({ theme }) => theme.components.button.interactive.pressed};
  }
`;

const TagEmojiWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  height: var(--rem-16);

  > svg {
    margin-right: var(--spacer-2xs);
  }
`;

const Spacer = styled.div`
  padding: var(--spacer-md) 0;
`;

export default FirstCreateSub;
