'use client';

import styled from 'styled-components';

import { Sub } from '@/app/types';

import IconBox from '../common/IconBox';
import BrowserIcon from '../svgs/BrowserIcon';
import CakeIcon from '../svgs/CakeIcon';

const SubDetailRightSideBar = ({ sub }: { sub: Sub }) => {
  return (
    <StyledRightSideBar>
      <RightSideBarWrapper>
        <InfoSection>
          <Title>{sub.title}</Title>
          <Description>{sub.description}</Description>

          <Options>
            <CreatedAtOption>
              <IconBox icon={<CakeIcon />} width={16} height={16} />
              <span>{`생성일 : ${formatTime(sub.createdAt)}`}</span>
            </CreatedAtOption>

            <VisibiltiyOption>
              <IconBox icon={<BrowserIcon />} width={16} height={16} />
              <span>
                {sub.visibility === 'public'
                  ? '공개'
                  : sub.visibility === 'restricted'
                    ? '제한됨'
                    : '비공개'}
              </span>
            </VisibiltiyOption>
          </Options>
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

const Options = styled.div`
  display: flex;
  flex-direction: column;

  height: var(--rem-40);

  gap: var(--spacer-2xs);
  margin-top: var(--spacer-sm);
`;

const CreatedAtOption = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  font: var(--font-12-16-regular);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};

  > div {
    margin-inline-end: var(--spacer-2xs);
  }

  > span {
    line-height: 1.5;
  }
`;

const VisibiltiyOption = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  font: var(--font-12-16-regular);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};

  > div {
    margin-inline-end: var(--spacer-2xs);
  }

  > span {
    line-height: 1.5;
  }
`;
export default SubDetailRightSideBar;
