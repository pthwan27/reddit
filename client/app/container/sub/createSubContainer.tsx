import { useState } from 'react';

import styled from 'styled-components';

import CreateSubFirstContainer from './create/subFirstContainer';
import CreateSubSecContainer from './create/subSecContainer';

const CreateSubContainer = () => {
  const [subName, setSubName] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState<File | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [subject, setSubject] = useState('');

  const [curInputBoxNum, setCurInputBoxNum] = useState(0);
  const inputBoxes = [
    <CreateSubFirstContainer
      subName={subName}
      setSubName={setSubName}
      desc={description}
      setDesc={setDescription}
    />,
    <CreateSubSecContainer
      banner={banner}
      setBanner={setBanner}
      icon={icon}
      setIcon={setIcon}
    />,
  ];

  return (
    <StyledCreateSubContainer>
      <CreateInputBox>{inputBoxes[curInputBoxNum]}</CreateInputBox>
      <CreateSubInfoBox>
        <div>{banner?.name}</div>
        <span>
          <>{icon?.name}</>
          r/{subName}
        </span>
        <div>{description}</div>
      </CreateSubInfoBox>

      <CreateSubCarousel>
        <div>indicator</div>
        <div>
          <button
            onClick={() => setCurInputBoxNum(curInputBoxNum - 1)}
          >{`<`}</button>
          <button
            onClick={() => setCurInputBoxNum(curInputBoxNum + 1)}
          >{`>`}</button>
        </div>
      </CreateSubCarousel>
    </StyledCreateSubContainer>
  );
};

const StyledCreateSubContainer = styled.div`
  display: flex;
  padding: var(--spacer-md);
  width: 100%;
`;
const CreateInputBox = styled.div`
  display: flex;
  flex-basis: 50%;
  justify-content: center;
`;
const CreateSubInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 50%;
`;

const CreateSubCarousel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;

  padding: var(--spacer-xs) var(--spacer-lg) var(--spacer-lg);

  width: 100%;
`;
export default CreateSubContainer;
