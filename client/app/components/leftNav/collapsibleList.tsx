'use client';

import { useState } from 'react';

import styled from 'styled-components';

import DownArrowIcon from '../svgs/DownArrowIcon';

interface CollapsibleListProps {
  title: string;
  children: React.ReactNode;
  initialOpen?: boolean;
}

const CollapsibleList = ({
  title,
  children,
  initialOpen = true,
}: CollapsibleListProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return (
    <StyledCollapsibleList>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <ArrowWrapper $isOpen={isOpen}>
          <DownArrowIcon />
        </ArrowWrapper>
      </ToggleButton>

      <ContentWrapper $isOpen={isOpen}>{children}</ContentWrapper>
    </StyledCollapsibleList>
  );
};

const StyledCollapsibleList = styled.div`
  width: 100%;
`;

const ToggleButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: var(--spacer-2xs) var(--spacer-md);
  letter-spacing: 0.1em;

  width: 100%;
  height: var(--rem-40);
  font: var(--font-12);

  border: none;

  color: ${({ theme }) => theme.colors.secondary.weak};
  text-transform: uppercase;

  margin-bottom: var(--spacer-xs);

  span {
    display: flex;
    align-items: center;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
    border-radius: var(--radius-md);

    border: none;
  }
`;

const ArrowWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(-180deg)')};
  transition: transform 0.2s ease-in-out;
`;

const ContentWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-4xs);

  overflow: hidden;

  max-height: ${({ $isOpen }) => ($isOpen ? 'var(--rem-1080)' : '0')};

  transition: max-height 0.3s ease-out;
`;

export default CollapsibleList;
