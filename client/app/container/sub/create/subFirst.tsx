import { useState } from 'react';

import styled from 'styled-components';

import SearchIcon from '@/app/components/svgs/SearchIcon';

import { TAG_CATEGORIES } from '@/app/constants/tags';

interface CreateSubFirstProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}
const FirstCreateSub = ({ selectedTags, onTagToggle }: CreateSubFirstProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = TAG_CATEGORIES.filter(
    (category) =>
      category.name.includes(searchTerm) ||
      category.subTags.some((subTag) => subTag.includes(searchTerm))
  );

  return (
    <Container>
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

      <Category>
        {filteredCategories.map((tag) => (
          <CategoryWrapper key={tag.id}>
            <CategoryTitle>{tag.name}</CategoryTitle>

            <TagButtons>
              {tag.subTags.map((subTag) => (
                <TagButton
                  key={subTag}
                  isSelected={selectedTags.includes(subTag)}
                  onClick={() => onTagToggle(subTag)}
                >
                  {subTag}
                </TagButton>
              ))}
            </TagButtons>
          </CategoryWrapper>
        ))}
      </Category>
    </Container>
  );
};

const Container = styled.div`
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
  margin: var(--spacer-xs) 0;
  font: var(--font-16-20-semibold);
`;

const Category = styled.div`
  height: 330px;
  padding: 0 var(--spacer-2xs);
  overflow-y: auto;
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-2xs);
  margin-bottom: var(--spacer-md);
`;

const CategoryTitle = styled.p`
  font: var(--font-14-20-semibold);
`;

const TagButtons = styled.div`
  display: flex;
  gap: var(--spacer-2xs);
`;

const TagButton = styled.button<{ isSelected: boolean }>`
  padding: 6px var(--spacer-sm);
  background: ${({ isSelected, theme }) =>
    isSelected
      ? theme.components.button.background.activated
      : theme.colors.secondary.background};
  border-radius: var(--radius-full);
  outline: ${({ isSelected, theme }) =>
    isSelected
      ? `var(--line-sm) solid ${theme.components.button.border.activated}`
      : 'var(--line-sm) solid transparent'};
  font: var(--font-12-16-semibold);

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }

  &:active {
    background: ${({ theme }) => theme.components.button.interactive.pressed};
  }
`;

const Spacer = styled.div`
  padding: var(--spacer-md) 0;
`;

export default FirstCreateSub;
