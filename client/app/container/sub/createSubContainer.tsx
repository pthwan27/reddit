import { useEffect, useState } from 'react';

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

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!banner) {
      setBannerPreview(null);
      return;
    }

    const objectURL = URL.createObjectURL(banner);
    setBannerPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [banner]);

  useEffect(() => {
    if (!icon) {
      setIconPreview(null);
      return;
    }

    const objectURL = URL.createObjectURL(icon);
    setIconPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [icon]);

  return (
    <StyledCreateSubContainer>
      <CreateSubMainContainer>
        <CreateInputBox>{inputBoxes[curInputBoxNum]}</CreateInputBox>
        <CreateSubInfoBox>
          <StyledBanner>
            {bannerPreview && <img src={bannerPreview} alt="banner" />}
          </StyledBanner>
          <StyledIconSub>
            {iconPreview && (
              <img src={iconPreview} width="fill" height="fill" alt="icon" />
            )}
            <span>r/{subName}</span>
          </StyledIconSub>
          <div>{description}</div>
        </CreateSubInfoBox>
      </CreateSubMainContainer>

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
  flex-direction: column;

  padding: 0 var(--spacer-lg);
  width: 100%;
`;

const CreateSubMainContainer = styled.div`
  display: flex;
`;
const CreateInputBox = styled.div`
  display: flex;
  justify-content: center;
  flex: 1 1 60%;
`;
const CreateSubInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 40%;

  height: var(--rem-192);

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  margin: 0 var(--rem-16);
  border-radius: var(--radius-lg);
`;

const StyledBanner = styled.div`
  width: 100%;
  height: 2rem;

  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledIconSub = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  gap: var(--spacer-xs);
  padding: var(--spacer-xs) 0;

  overflow: hidden;

  img {
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-full);

    object-fit: cover;
  }
  span {
    font: var(--font-16);
  }
`;

const CreateSubCarousel = styled.div`
  display: flex;
  justify-content: space-between;

  padding: var(--spacer-lg) var(--spacer-xs) var(--spacer-xs);

  width: 100%;
`;
export default CreateSubContainer;
