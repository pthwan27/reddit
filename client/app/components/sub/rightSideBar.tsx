'use client';

import formatTime from '@/app/utils/formatTime';

import styled from 'styled-components';

import { Sub } from '@/app/types';

import IconBox from '../common/IconBox';
import BrowserIcon from '../svgs/BrowserIcon';
import CakeIcon from '../svgs/CakeIcon';

const SubDetailRightSideBar = ({ sub }: { sub: Sub }) => {
  return (
    <StyledRightSideBar>
      <RightSideBarWrapper>
        <TopSection>
          <Title>{sub.title}</Title>
          <Description>{sub.description}</Description>

          <Infos>
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

            <InfosBottomRow>
              <SubscriberCount>
                <span>{sub.subscriberCount}</span>
                <span>subscriber</span>
              </SubscriberCount>

              <PostCount>
                <span>{sub.postCount}</span>
                <span>post</span>
              </PostCount>
            </InfosBottomRow>
          </Infos>
        </TopSection>
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

const TopSection = styled.div`
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

const Infos = styled.div`
  display: flex;
  flex-direction: column;

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

const InfosBottomRow = styled.div`
  display: flex;

  margin-top: var(--spacer-xs);
`;

const SubscriberCount = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  > span:first-child {
    font: var(--font-14-20-bold);
    color: ${({ theme }) => theme.colors.neutral.content};
  }

  > span:last-child {
    font: var(--font-12-16-regular);
    color: ${({ theme }) => theme.colors.neutral.contentWeak};
  }
`;
const PostCount = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  > span:first-child {
    font: var(--font-14-20-bold);
    color: ${({ theme }) => theme.colors.neutral.content};
  }

  > span:last-child {
    font: var(--font-12-16-regular);
    color: ${({ theme }) => theme.colors.neutral.contentWeak};
  }
`;

export default SubDetailRightSideBar;
