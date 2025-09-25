import { useState } from 'react';

import styled from 'styled-components';

import CreateSubFirstContainer from './create/subFirstContainer';
import CreateSubSecContainer from './create/subFirstContainer';

const CreateSubContainer = () => {
  const [subName, setSubName] = useState('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState('');
  const [icon, setIcon] = useState('');
  const [subject, setSubject] = useState('');

  const [curInputBoxNum, setCurInputBoxNum] = useState(0);
  const inputBoxes = [<CreateSubFirstContainer />, <CreateSubSecContainer />];

  return (
    <StyledCreateSubContainer>
      <CreateInputBox>{inputBoxes[curInputBoxNum]}</CreateInputBox>
      <CreateSubInfoBox>{inputBoxes[curInputBoxNum]}</CreateSubInfoBox>
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
`;

export default CreateSubContainer;
