'use client';

import formatTime from '@/app/utils/formatTime';

import styled from 'styled-components';

import { SubBaseRule } from '@/app/constants/SubBaseRule';
import { Sub } from '@/app/types';

import IconBox from '../common/IconBox';
import CollapsibleList from '../common/collapsibleList';
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
            <InfoItem>
              <IconBox icon={<CakeIcon />} width={16} height={16} />
              <span>{`생성일 : ${formatTime(sub.createdAt)}`}</span>
            </InfoItem>

            <InfoItem>
              <IconBox icon={<BrowserIcon />} width={16} height={16} />
              <span>
                {sub.visibility === 'public'
                  ? '공개'
                  : sub.visibility === 'restricted'
                    ? '제한됨'
                    : '비공개'}
              </span>
            </InfoItem>

            <CountInfosRows>
              <CountInfosRowItem>
                <span>{sub.subscriberCount}</span>
                <span>subscriber</span>
              </CountInfosRowItem>

              <CountInfosRowItem>
                <span>{sub.postCount}</span>
                <span>post</span>
              </CountInfosRowItem>
            </CountInfosRows>
          </Infos>
        </TopSection>

        <Divider />

        <RuleSection>
          <RuleTitle>{`r/${sub.title} 이용 규칙`}</RuleTitle>

          <RulesWrapper>
            {SubBaseRule.map((rule) => (
              <RuleItem key={rule.id}>
                <CollapsibleList
                  title={
                    <CollapsibleListTitleWrapper>
                      <RuleNumber>{rule.id}</RuleNumber>
                      <RuleItemTitle>{rule.title}</RuleItemTitle>
                    </CollapsibleListTitleWrapper>
                  }
                  initialOpen={false}
                >
                  <RuleDescription>{rule.description}</RuleDescription>
                </CollapsibleList>
              </RuleItem>
            ))}
          </RulesWrapper>
        </RuleSection>
      </RightSideBarWrapper>
    </StyledRightSideBar>
  );
};

const StyledRightSideBar = styled.aside`
  padding: var(--spacer-md) 0;
`;

const RightSideBarWrapper = styled.div`
  padding: var(--spacer-md) 0;

  background: ${({ theme }) => theme.colors.neutral.backgroundContainer};
  border-radius: var(--radius-md);
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 var(--spacer-md);
`;

const Title = styled.p`
  margin-top: var(--spacer-xs);

  font: var(--font-14-20-bold);
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

const InfoItem = styled.div`
  display: flex;
  flex: 1;
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

const CountInfosRows = styled.div`
  display: flex;

  margin-top: var(--spacer-xs);
`;

const CountInfosRowItem = styled.div`
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

const Divider = styled.hr`
  margin: var(--spacer-md) 0;

  border: 0;
  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.neutral.borderWeak};
`;

const RuleSection = styled.div`
  padding: 0 var(--spacer-md);
`;

const RuleTitle = styled.p`
  margin-bottom: var(--spacer-sm);

  font: var(--font-12-16-semibold);
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
`;

const RulesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RuleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-bottom: var(--spacer-xs);
`;

const CollapsibleListTitleWrapper = styled.div`
  position: relative;
  display: flex;

  width: 100%;
  min-height: var(--rem-48);
`;

const RuleNumber = styled.span`
  display: flex;
  flex: 0 0 var(--rem-32);
  align-items: center;
  justify-content: flex-start;

  font: var(--font-14-20-regular);
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
`;

const RuleItemTitle = styled.span`
  flex: 1;
  max-width: 200px;

  overflow: hidden;

  font: var(--font-14-20-regular);
  text-align: left;
  text-wrap: wrap;
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
`;

const RuleDescription = styled.p`
  margin-bottom: var(--spacer-2xs);
  margin-left: var(--spacer-xl);
  padding-right: var(--spacer-xl);
  padding-left: var(--spacer-md);

  font: var(--font-14-20-regular);
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.neutral.contentWeak};
`;

export default SubDetailRightSideBar;
