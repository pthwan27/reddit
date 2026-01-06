import styled from 'styled-components';

import IconBox from '@/app/components/common/IconBox';
import RadioButtonFill from '@/app/components/svgs/RadioButtonFill';
import RadioButtonOutline from '@/app/components/svgs/RadioButtonOutline';

import { SubVisibilityOptions } from '@/app/constants/createSubModal';
import { SubVisibility } from '@/app/types';

type CreateSubSecProps = {
  subVisibility: SubVisibility;
  setSubVisibility: React.Dispatch<React.SetStateAction<SubVisibility>>;
};
const SecCreateSub = ({
  subVisibility,
  setSubVisibility,
}: CreateSubSecProps) => {
  return (
    <CreateSubSecContainer>
      {SubVisibilityOptions.map((option, idx) => {
        return (
          <OptionWrapper
            key={idx}
            isSelected={subVisibility === option.id}
            onClick={() => setSubVisibility(option.id as SubVisibility)}
          >
            <IconBox
              icon={option.id === subVisibility ? option.fillSvg : option.svg}
              width={20}
              height={20}
            />
            <Infos>
              <span>{option.name}</span>
              <span>{option.desc}</span>
            </Infos>

            <IconBox
              icon={
                option.id === subVisibility ? (
                  <RadioButtonFill />
                ) : (
                  <RadioButtonOutline />
                )
              }
              width={20}
              height={20}
            />
          </OptionWrapper>
        );
      })}
    </CreateSubSecContainer>
  );
};

const CreateSubSecContainer = styled.div`
  width: 100%;
`;

const OptionWrapper = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--spacer-md);
  height: var(--rem-64);

  padding: var(--spacer-xs) var(--spacer-md);

  background: ${({ isSelected, theme }) =>
    isSelected
      ? theme.colors.neutral.backgroundSelected
      : theme.colors.neutral.background};

  &:last-child {
    margin-left: auto;
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  > span:first-child {
    font: var(--font-14-20-regular);
    color: ${({ theme }) => theme.colors.secondary.onBackground};
  }

  > span:last-child {
    font: var(--font-12-16-regular);
    color: ${({ theme }) => theme.colors.secondary.weak};
  }
`;

export default SecCreateSub;
