import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import IconBox from '@/app/components/common/IconBox';
import SmallLoadingSpinner from '@/app/components/common/loading/smallLoadingSpinner';
import UploadIcon from '@/app/components/svgs/UploadIcon';

import MediaCarousel from '../../common/mediaCarousel';

interface ImageUploadProps {
  mediaFiles: File[];
  setMediaFiles: (files: File[]) => void;
  imgUrls: string[];
  setImgUrls: (urls: string[]) => void;
}
const ImageUpload = ({
  mediaFiles,
  setMediaFiles,
  imgUrls,
  setImgUrls,
}: ImageUploadProps) => {
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [curImgIdx, setcurImgIdx] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      setIsUploading(false);
      return;
    }

    if (files[0].type.startsWith('video/')) {
      if (files.length > 1) {
        alert('동영상은 한 번에 하나씩만 업로드할 수 있습니다.');
        setIsUploading(false);
        return;
      }
      if (mediaFiles.length > 0 && mediaType === 'image') {
        const confirmed = window.confirm(
          '이미지 미디어가 이미 업로드되어 있습니다. 동영상으로 변경하시겠습니까?'
        );
        if (!confirmed) {
          setIsUploading(false);
          return;
        }
      }
      setTimeout(() => {
        imgUrls.forEach((url) => URL.revokeObjectURL(url));

        const newUrl = URL.createObjectURL(files[0]);
        setMediaFiles([files[0]]);
        setImgUrls([newUrl]);
        setMediaType('video');
        setIsUploading(false);
      }, 1000);
    } else if (files[0].type.startsWith('image/')) {
      if (mediaFiles.length > 0 && mediaType === 'video') {
        const confirmed = window.confirm(
          '비디오가 이미 업로드되어 있습니다. 이미지로 교체하시겠습니까?'
        );
        if (!confirmed) {
          setIsUploading(false);
          return;
        }
      }

      const imageFiles = files.filter((file) => file.type.startsWith('image/'));

      setTimeout(() => {
        const newUrls = imageFiles.map((file) => URL.createObjectURL(file));

        if (mediaType === 'video') {
          imgUrls.forEach((url) => URL.revokeObjectURL(url));
          setMediaFiles(imageFiles);
          setImgUrls(newUrls);
        } else {
          setMediaFiles([...mediaFiles, ...imageFiles]);
          setImgUrls([...imgUrls, ...newUrls]);
          setIsUploading(false);
        }

        setMediaType('image');
        setIsUploading(false);
      }, 1000);
    } else {
      alert('지원하지 않는 파일 형식입니다.');
      setIsUploading(false);
      return;
    }
  };

  const handleAddMoreImages = () => {
    if (mediaType === 'video') {
      alert('비디오는 1개만 업로드 가능합니다.');
      return;
    }

    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();

    if (imgUrls[index]) {
      URL.revokeObjectURL(imgUrls[index]);
    }

    const newFiles = mediaFiles.filter((_, i) => i !== index);
    const newUrls = imgUrls.filter((_, i) => i !== index);

    setMediaFiles(newFiles);
    setImgUrls(newUrls);

    if (newFiles.length === 0) setMediaType(null);

    if (curImgIdx >= newFiles.length && newFiles.length > 0) {
      setcurImgIdx(newFiles.length - 1);
    } else if (newFiles.length === 0) {
      setcurImgIdx(0);
    }
  };

  useEffect(() => {
    if (imgUrls.length > 1) {
      const preloadIndexes = [curImgIdx - 1, curImgIdx + 1].filter(
        (idx) => idx >= 0 && idx < imgUrls.length
      );

      preloadIndexes.forEach((idx) => {
        const img = new window.Image();
        img.src = imgUrls[idx];
      });
    }
  }, [curImgIdx, imgUrls]);

  useEffect(() => {
    return () => {
      imgUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return (
    <MediaUploadArea>
      <InputBox onClick={handleAddMoreImages} />

      {isUploading ? (
        <SpinnerWrapper>
          <SmallLoadingSpinner />
        </SpinnerWrapper>
      ) : imgUrls && imgUrls.length > 0 ? (
        <MediaCarousel
          mediaUrls={imgUrls}
          curIdx={curImgIdx}
          setCurIdx={setcurImgIdx}
          onAddMore={handleAddMoreImages}
          onRemove={handleRemove}
          mediaType={mediaType}
        />
      ) : (
        <PlaceholderText>
          미디어를 끌어다 놓거나 업로드하기
          <IconBox
            icon={<UploadIcon />}
            width={32}
            height={32}
            backgroundColor="secondary"
            percentage={50}
            onClick={handleAddMoreImages}
          />
        </PlaceholderText>
      )}

      {!isUploading &&
        imgUrls &&
        imgUrls.length > 1 &&
        mediaType === 'image' && (
          <CarouselWrapper>
            {imgUrls.map((_, idx) => (
              <CarouselItem
                type="button"
                key={idx}
                $isSelected={idx === curImgIdx}
                onClick={() => setcurImgIdx(idx)}
              />
            ))}
          </CarouselWrapper>
        )}
      <HiddenInput
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept="image/*, video/*"
        multiple={mediaType !== 'video'}
        disabled={isUploading}
      />
    </MediaUploadArea>
  );
};

const MediaUploadArea = styled.div`
  position: relative;
  min-height: min(20vw, 250px);
  height: max(23vw, 250px);
`;

const InputBox = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;
`;

const PlaceholderText = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: var(--spacer-2xs);

  font: var(--font-14-20-regular);

  padding: var(--spacer-2xs) var(--spacer-sm);

  border: var(--line-sm) dashed ${({ theme }) => theme.colors.neutral.border};
  border-radius: var(--radius-xl);

  span {
    padding-top: 0.25rem;
    padding-left: 0.25rem;
  }

  svg {
    cursor: pointer;
  }
`;

const CarouselWrapper = styled.div`
  position: absolute;
  bottom: var(--spacer-sm);
  left: 50%;
  transform: translateX(-50%);

  height: var(--rem-16);

  display: flex;
  align-items: center;
  gap: var(--spacer-4xs);
  padding: 0 var(--spacer-2xs);

  background: ${({ theme }) => theme.colors.media.background};
  border-radius: var(--radius-full);

  z-index: 10;
`;

const CarouselItem = styled.button<{ $isSelected: boolean }>`
  width: var(--rem-6);
  height: var(--rem-6);

  background: ${({ $isSelected, theme }) =>
    $isSelected
      ? theme.colors.media.onBackground
      : theme.colors.media.onBackgroundDisabled};

  border-radius: var(--radius-full);
  cursor: pointer;

  padding: 0;
  margin: var(--spacer-4xs);

  z-index: 10;

  &:hover {
    background: ${({ $isSelected, theme }) =>
      !$isSelected && theme.colors.media.onBackgroundWeak};
  }

  transition: all 0.4s;
`;

const HiddenInput = styled.input`
  display: none;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: var(--radius-xl);
`;

export default ImageUpload;
