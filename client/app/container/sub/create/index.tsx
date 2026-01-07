import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { validationCheck } from '@/app/utils/validationCheck';

import { useAuthStore } from '@/app/store/authStore';
import { useModalStore } from '@/app/store/modalStore';
import { useSubStore } from '@/app/store/subStore';
import { useUIStore } from '@/app/store/uiStore';

import styled from 'styled-components';

import ErrorMessage from '@/app/components/common/errorMessage';
import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';

import { MAX_TAGS } from '@/app/constants/tags';
import { SubVisibility } from '@/app/types';

import FirstCreateSub from './subFirst';
import FourthCreateSub from './subFourth';
import SecCreateSub from './subSec';
import ThirdCreateSub from './subThird';

const CreateSub = ({
  curInputBoxNum,
  setCurInputBoxNum,
}: {
  curInputBoxNum: number;
  setCurInputBoxNum: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();

  const { user } = useAuthStore();
  const { close } = useModalStore();
  const modalkey = 'createSubModal';

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [subVisibility, setSubVisibility] = useState<SubVisibility>('public');

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState('');
  const [banner, setBanner] = useState<File | null>(null);
  const [icon, setIcon] = useState<File | null>(null);

  const [error, setError] = useState('');
  const { createSub, loading } = useSubStore();
  const { setLeftNavByHeaderVisible } = useUIStore();

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const titleValidation = useMemo(
    () => validationCheck(title, 'subTitle'),
    [title]
  );
  const descValidation = useMemo(
    () => validationCheck(description, 'subDesc'),
    [description]
  );

  const handleTageToggle = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        setError('');
        return prev.filter((t) => t !== tag);
      } else {
        if (prev.length >= MAX_TAGS) {
          setError(`최대 ${MAX_TAGS}개의 태그만 선택할 수 있습니다.`);
          return prev;
        }
        return [...prev, tag];
      }
    });
  };

  const handleCreateSub = async () => {
    if (!user) {
      return router.push('/login');
    }
    try {
      await createSub({
        tags: selectedTags,
        visibility: subVisibility,
        title,
        description,
        icon,
        banner,
        bannerPreview,
        iconPreview,
        username: user.username,
      });

      close(modalkey);
      setLeftNavByHeaderVisible(false);
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Create Sub failed:', error);
      setError(error.message);
    }

    if (loading) {
      return <LoadingSpinner />;
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
    setError('');

    if (!check) {
      setCurInputBoxNum(idx);
      return;
    }

    if (curInputBoxNum === 2) {
      if (titleValidation !== 'valid') {
        return setError(titleValidation);
      }

      if (descValidation !== 'valid') {
        return setError(descValidation);
      }
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

  const inputBoxes = [
    <FirstCreateSub
      key={'create-sub-first'}
      selectedTags={selectedTags}
      onTagToggle={handleTageToggle}
    />,
    <SecCreateSub
      key={'create-sub-sec'}
      subVisibility={subVisibility}
      setSubVisibility={setSubVisibility}
    />,
    <ThirdCreateSub
      key={'create-sub-third'}
      title={title}
      setTitle={setTitle}
      desc={description}
      setDesc={setDescription}
    />,
    <FourthCreateSub
      key={'create-sub-fourth'}
      banner={banner}
      setBanner={setBanner}
      icon={icon}
      setIcon={setIcon}
    />,
  ];
  return (
    <CreateSubContainer>
      <MainWrapper>
        <CreateInputBox $showInfoBox={curInputBoxNum >= 2}>
          {inputBoxes[curInputBoxNum]}
        </CreateInputBox>
        {curInputBoxNum >= 2 && (
          <CreateSubInfoBox>
            <InfoWrapper>
              {curInputBoxNum > 0 && (
                <StyledBanner $isSelected={!banner}>
                  {bannerPreview && (
                    <Image
                      src={bannerPreview}
                      alt="banner"
                      fill
                      sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
                    />
                  )}
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
            </InfoWrapper>
          </CreateSubInfoBox>
        )}
      </MainWrapper>

      <CreateSubCarousel>
        <CarouselWrapper>
          {inputBoxes.map((_, idx) => (
            <CarouselItem
              type="button"
              key={idx}
              $isSelected={idx === curInputBoxNum}
              onClick={() => moveToSlide(idx, true)}
            />
          ))}
        </CarouselWrapper>
        <ButtonWrapper>
          <button
            onClick={() => prevSlice()}
            disabled={curInputBoxNum === 0}
          >{`취소`}</button>

          <button
            onClick={() => nextSlice()}
            disabled={
              (curInputBoxNum === inputBoxes.length - 1 ||
                selectedTags.length === 0) &&
              (titleValidation !== 'valid' || descValidation !== 'valid')
            }
          >
            {curInputBoxNum === inputBoxes.length - 1 ? '생성하기' : '다음'}
          </button>
        </ButtonWrapper>
      </CreateSubCarousel>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </CreateSubContainer>
  );
};

const CreateSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0 var(--spacer-md);
  width: 100%;
  height: 100%;
`;

const MainWrapper = styled.div`
  display: flex;
  gap: var(--spacer-md);
`;

const CreateInputBox = styled.div<{ $showInfoBox: boolean }>`
  display: flex;
  justify-content: center;

  flex: 1;
  @media (min-width: 768px) {
    flex: ${({ $showInfoBox }) => ($showInfoBox ? '0 0 404px' : '1')};
    width: ${({ $showInfoBox }) => ($showInfoBox ? '404px' : '100%')};
  }
`;
const CreateSubInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;

  flex: 1;

  @media (min-width: 768px) {
    flex: 0 0 315px;
    width: 315px;
    padding: 0 var(--spacer-md);
  }
`;
const InfoWrapper = styled.div`
  width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: var(--radius-xl);
`;

const StyledBanner = styled.div<{ $isSelected: boolean }>`
  position: relative;
  width: 100%;
  height: 2rem;

  background: ${({ $isSelected }) => ($isSelected ? '#fceee8' : 'transparent')};

  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
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

  width: var(--rem-48);
  height: var(--rem-48);

  min-width: var(--rem-48);
  min-height: var(--rem-48);

  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.global.moderator : 'transparent'};

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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
  }

  span:nth-child(2) {
    font: var(--font-12);
    color: ${({ theme }) => theme.colors.secondary.plainWeak};
  }
`;

const StyledDesc = styled.div`
  padding: var(--spacer-sm) var(--spacer-sm) var(--spacer-md);

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

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
`;

const CarouselItem = styled.button<{ $isSelected: boolean }>`
  width: var(--rem-8);
  height: var(--rem-8);

  background: ${({ $isSelected, theme }) =>
    $isSelected
      ? theme.components.button.secondary.text.default
      : theme.components.button.secondary.background.default};

  border-radius: var(--radius-full);
  cursor: pointer;

  padding: 0;

  &:hover {
    background: ${({ $isSelected, theme }) =>
      !$isSelected && theme.components.button.secondary.background.hover};
  }

  transition: all 0.4s;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: var(--spacer-xs);

  button:nth-child(1) {
    background: ${({ theme }) =>
      theme.components.button.secondary.background.default};

    &:hover {
      background: ${({ theme }) =>
        theme.components.button.secondary.background.hover};
    }
  }

  button:nth-child(2) {
    background: ${({ theme }) => theme.colors.primary.background};
    color: ${({ theme }) => theme.colors.global.white};

    &:hover {
      background: ${({ theme }) => theme.colors.primary.backgroundHover};
    }
  }
`;

export default CreateSub;
