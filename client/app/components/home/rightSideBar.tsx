'use client';

import styled from 'styled-components';

import { Sub, User } from '@/app/types';

const HomeRightSideBar = ({
  user,
  popularSubs,
}: {
  user: User | null;
  popularSubs: Sub[];
}) => {
  return (
    <StyledRightSideBar>
      <RightSideBarWrapper>
        {!user ? (
          <>
            {popularSubs.map((sub) => (
              <div key={sub.id}>
                {sub.title} ({sub.subscriberCount}명 구독)
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </RightSideBarWrapper>
    </StyledRightSideBar>
  );
};

const StyledRightSideBar = styled.aside`
  padding: var(--spacer-md) 0;
`;

const RightSideBarWrapper = styled.div`
  height: 100%;
  padding: var(--spacer-sm);
  background: ${({ theme }) => theme.colors.neutral.backgroundContainer};

  border-radius: var(--radius-lg);

  @media (min-width: 768px) {
    margin: var(--spacer-md) 0;
  }
`;

export default HomeRightSideBar;
