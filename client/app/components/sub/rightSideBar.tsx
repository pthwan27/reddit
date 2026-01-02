'use client';

import styled from 'styled-components';

import { Sub } from '@/app/types';

const SubDetailRightSideBar = ({ sub }: { sub: Sub }) => {
  return (
    <StyledRightSideBar>
      <RightSideBarWrapper>
        <InfoSection>
          <Title>{sub.title}</Title>
          <Description>{sub.description}</Description>

          <CreatedAt>{`생성일 : ${sub.createdAt}`}</CreatedAt>
        </InfoSection>
      </RightSideBarWrapper>
    </StyledRightSideBar>
  );
};

const StyledRightSideBar = styled.aside`
  padding: var(--spacer-md) 0;
`;

const RightSideBarWrapper = styled.div`
  background: ${({ theme }) => theme.colors.neutral.backgroundContainer};
  border-radius: var(--radius-md);

  padding: var(--spacer-md) 0;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 var(--spacer-md);
`;
const Title = styled.p`
  font: var(--font-14-20-semibold);
`;
const Description = styled.p`
  font: var(--font-14-20-regular);
`;

const CreatedAt = styled.p`
  font: var(--font-12-16-regular);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
  margin-top: var(--spacer-sm);
`;
export default SubDetailRightSideBar;
