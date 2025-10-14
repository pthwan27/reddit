import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useCreateSub } from '@/app/hooks/useCreateSub';

import styled from 'styled-components';

import LoadingSpinner from '@/app/components/common/loadingSpinner';

import { ValidationRule } from '@/app/types';

import CreateSubFirstContainer from './create/subFirstContainer';
import CreateSubSecContainer from './create/subSecContainer';

const CreateSubContainer = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState<File | null>(null);
  const [icon, setIcon] = useState<File | null>(null);
  const [curInputBoxNum, setCurInputBoxNum] = useState<number>(0);

  const { createSub, error, isSubmitting, isLoading, isAuthenticated } =
    useCreateSub();

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const inputBoxes = [
    <CreateSubFirstContainer
      key={'create-sub-first'}
      title={title}
      setTitle={setTitle}
      desc={description}
      setDesc={setDescription}
    />,
    <CreateSubSecContainer
      key={'create-sub-sec'}
      banner={banner}
      setBanner={setBanner}
      icon={icon}
      setIcon={setIcon}
    />,
  ];

  const handleCreateSub = async () => {
    await createSub({
      title,
      description,
      banner,
      icon,
    });

    if (isSubmitting || isLoading) {
      return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
      return router.push('/login');
    }
  };

  const validationCheck = (stepIdx: number): ValidationRule[] => {
    switch (stepIdx) {
      case 0:
        return [
          {
            condition: !title.trim(),
            message: '커뮤니티 이름을 입력해주세요',
          },
          {
            condition: !description.trim(),
            message: '커뮤니티 설명을 입력해주세요',
          },
          {
            condition: title.trim().length < 3,
            message: '커뮤니티 이름은 3글자 이상이어야 합니다.',
          },
          {
            condition: description.trim().length < 10, //
            message: '커뮤니티 설명은 10글자 이상이어야 합니다.',
          },
        ];
      case 1:
        return [
          {
            condition: !banner,
            message: '배너 이미지를 업로드해주세요.',
          },
          {
            condition: !icon,
            message: '아이콘 이미지를 업로드해주세요.',
          },
        ];
      default:
        return [];
    }
  };

  const nextSlice = () => {
    const nextIdx =
      (curInputBoxNum + 1 >= inputBoxes.length
        ? inputBoxes.length - 1
        : curInputBoxNum + 1) % inputBoxes.length;

    moveToSlide(nextIdx, true);
  };

  const prevSlice = () => {
    const prevIdx =
      (curInputBoxNum - 1 < 0 ? 0 : curInputBoxNum - 1) % inputBoxes.length;

    moveToSlide(prevIdx, false);
  };

  const moveToSlide = (idx: number, check: boolean) => {
    if (!check) {
      setCurInputBoxNum(idx);
      return;
    }

    const rules = validationCheck(curInputBoxNum);

    const faildRule = rules.find((rule) => rule.condition);

    if (faildRule?.condition) {
      alert(faildRule.message);
      return;
    }

    if (curInputBoxNum === inputBoxes.length - 1) {
      handleCreateSub();
    } else {
      setCurInputBoxNum(idx);
    }
  };

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
          {curInputBoxNum > 0 && (
            <StyledBanner $isSelected={!banner}>
              {bannerPreview && <Image src={bannerPreview} alt="banner" fill />}
            </StyledBanner>
          )}
          <StyledMain>
            {curInputBoxNum > 0 && (
              <IconBox $isSelected={!icon}>
                {iconPreview && <Image src={iconPreview} alt="icon" fill />}
              </IconBox>
            )}
            <InfoBox>
              <span>r/{title}</span>
              <span>1 멤버 ·온라인 접속자 1명</span>
            </InfoBox>
          </StyledMain>
          <StyledDesc>
            {description ? description : '내 커뮤니티 설명'}
          </StyledDesc>
        </CreateSubInfoBox>
      </CreateSubMainContainer>

      <CreateSubCarousel>
        <CarouselContainer>
          {inputBoxes.map((_, idx) => (
            <CarouselItem
              key={idx}
              $isSelected={idx === curInputBoxNum}
              onClick={() => moveToSlide(idx, true)}
            />
          ))}
        </CarouselContainer>
        <ButtonContainer>
          <button onClick={() => prevSlice()}>{`취소`}</button>
          <button onClick={() => nextSlice()}>{`다음`}</button>
        </ButtonContainer>
      </CreateSubCarousel>

      {error && <ErrorMessage>{error}</ErrorMessage>}
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
  gap: var(--spacer-md);
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
  flex: 0 0 40%;

  height: 100%;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  border-radius: var(--radius-lg);
`;

const StyledBanner = styled.div<{ $isSelected: boolean }>`
  position: relative;
  width: 100%;
  height: 2rem;

  background: ${({ $isSelected }) => ($isSelected ? '#fceee8' : 'transparent')};

  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StyledMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  gap: var(--spacer-md);
  padding: var(--spacer-md) var(--spacer-md) 0;

  width: 100%;
  overflow: hidden;
`;
const IconBox = styled.div<{ $isSelected: boolean }>`
  position: relative;
  width: 3rem;
  height: 3rem;

  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primary : 'transparent'};

  border-radius: var(--radius-full);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;

    border-radius: var(--radius-full);
    object-fit: cover;

    background: transparent;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;

  span:nth-child(1) {
    font: var(--font-20);
    margin-bottom: var(--spacer-xs);
  }

  span:nth-child(2) {
    font: var(--font-12);
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const StyledDesc = styled.div`
  padding: var(--spacer-xs) var(--spacer-sm) var(--spacer-md);

  width: 100%;

  word-break: break-all;

  font: var(--font-14);
`;
const CreateSubCarousel = styled.div`
  display: flex;
  justify-content: space-between;

  padding: var(--spacer-lg) var(--spacer-xs) 0;

  width: 100%;
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
`;

const CarouselItem = styled.div<{ $isSelected: boolean }>`
  width: var(--rem-8);
  height: var(--rem-8);

  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.text : theme.colors.darkgrayBackground};

  border-radius: var(--radius-full);
  cursor: pointer;

  &:hover {
    background: ${({ $isSelected, theme }) =>
      !$isSelected && theme.colors.darkgrayHover};
  }

  transition: all 0.4s;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: var(--spacer-xs);

  button:nth-child(1) {
    background: ${({ theme }) => theme.colors.grayBackground};

    &:hover {
      background: ${({ theme }) => theme.colors.darkgrayBackground};
    }
  }
  button:nth-child(2) {
    background: ${({ theme }) => theme.colors.secondaryLight};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error || '#ff6b6b'};
  font: var(--font-14);
  text-align: center;
  margin: var(--spacer-xs) 0;
`;

export default CreateSubContainer;
