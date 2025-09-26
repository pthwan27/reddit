import { useState } from 'react';

import styled from 'styled-components';

import CreateSubFirstContainer from './create/subFirstContainer';

const CreateSubContainer = () => {
  const [subName, setSubName] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState('');
  const [icon, setIcon] = useState('');
  const [subject, setSubject] = useState('');

  const [curInputBoxNum, setCurInputBoxNum] = useState(0);
  const inputBoxes = [
    <CreateSubFirstContainer
      subName={subName}
      setSubName={setSubName}
      desc={description}
      setDesc={setDescription}
    />,
  ];

  return (
    <StyledCreateSubContainer>
      <CreateInputBox>{inputBoxes[curInputBoxNum]}</CreateInputBox>
      <CreateSubInfoBox>
        <div>{banner}</div>
        <span>
          <>{icon}</>
          r/{subName}
        </span>
        <div>{description}</div>
      </CreateSubInfoBox>

      <CreateSubCarousel>
        <>indicator</>
        <>prev , next button</>
      </CreateSubCarousel>
    </StyledCreateSubContainer>
  );
};

const StyledCreateSubContainer = styled.div`
  display: flex;
  padding: var(--spacer-md);
`;
const CreateInputBox = styled.div`
  display: flex;
`;
const CreateSubInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default CreateSubContainer;
