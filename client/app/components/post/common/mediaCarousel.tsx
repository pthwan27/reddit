import Image from 'next/image';

import styled from 'styled-components';

import IconBox from '@/app/components/common/IconBox';
import ChevronLeftIcon from '@/app/components/svgs/ChevronLeftIcon';
import ChevronRightIcon from '@/app/components/svgs/ChevronRightIcon';
import DeleteIcon from '@/app/components/svgs/DeleteIcon';
import ImagesIcon from '@/app/components/svgs/ImagesIcon';

type ItemVersion = 'submit' | 'view';
interface MediaCarouselProps {
  mediaUrls: string[];
  curIdx: number;
  setCurIdx: (idx: number) => void;
  onAddMore?: () => void;
  onRemove?: (e: React.MouseEvent, idx: number) => void;
  mediaType?: 'image' | 'video' | null;
  version?: ItemVersion;
}
const MediaCarousel = ({
  mediaUrls,
  curIdx,
  setCurIdx,
  onAddMore,
  onRemove,
  mediaType = 'image',
  version = 'submit',
}: MediaCarouselProps) => {
  const nextSlice = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (curIdx < mediaUrls.length - 1) {
      setCurIdx(curIdx + 1);
    }
  };

  const prevSlice = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (curIdx > 0) {
      setCurIdx(curIdx - 1);
    }
  };

  return (
    <SelectedFileWrapper>
      <ActionButtons>
        {mediaType === 'image' && onAddMore && (
          <ImgAddButton onClick={onAddMore}>
            <IconBox
              icon={<ImagesIcon />}
              width={32}
              height={32}
              backgroundColor="transparent"
              percentage={50}
            />
            <span>추가</span>
          </ImgAddButton>
        )}
        {onRemove && (
          <DeleteButton>
            <IconBox
              icon={<DeleteIcon />}
              width={32}
              height={32}
              backgroundColor="transparent"
              onClick={(e) => onRemove(e, curIdx)}
              percentage={50}
            />
          </DeleteButton>
        )}
        {mediaUrls.length > 1 && curIdx > 0 && (
          <PreviousButton>
            <IconBox
              icon={<ChevronLeftIcon />}
              width={32}
              height={32}
              backgroundColor="transparent"
              onClick={(e) => prevSlice(e)}
              percentage={50}
            />
          </PreviousButton>
        )}
        {mediaUrls.length > 1 && curIdx < mediaUrls.length - 1 && (
          <NextButton>
            <IconBox
              icon={<ChevronRightIcon />}
              width={32}
              height={32}
              backgroundColor="transparent"
              onClick={(e) => nextSlice(e)}
              percentage={50}
            />
          </NextButton>
        )}
      </ActionButtons>

      {mediaType === 'image' ? (
        <ImgCarouselWrapper $version={version}>
          <ImgCarouselTrack
            id="imgCarouselTrack"
            $currentIndex={curIdx}
            $totalItems={mediaUrls.length}
          >
            {version === 'submit' ? (
              <>
                {mediaUrls.map((file, idx) => (
                  <ImgCarouselItem key={idx} $totalItems={mediaUrls.length}>
                    <Image
                      src={file}
                      alt={`submit preview ${curIdx + 1}`}
                      fill
                      sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
                    />
                    <Image
                      src={file}
                      alt={`submit preview background ${curIdx + 1}`}
                      fill
                      sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
                    />
                  </ImgCarouselItem>
                ))}
              </>
            ) : (
              <>
                {mediaUrls.map((file, idx) => (
                  <ImgCarouselItemV2 key={idx} $totalItems={mediaUrls.length}>
                    <Image
                      src={file}
                      alt={`submit preview ${curIdx + 1}`}
                      width={750}
                      height={540}
                      sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
                    />
                    <Image
                      src={file}
                      alt={`submit preview background ${curIdx + 1}`}
                      fill
                      sizes="(min-width: 1415px) 750px, (min-width: 768px) 50vw, 100vw"
                    />
                  </ImgCarouselItemV2>
                ))}
              </>
            )}
          </ImgCarouselTrack>
        </ImgCarouselWrapper>
      ) : (
        <VideoWrapper>
          <video src={mediaUrls[0]} controls muted />
          <div />
        </VideoWrapper>
      )}
    </SelectedFileWrapper>
  );
};

const ActionButtons = styled.div``;

const ImgAddButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: var(--spacer-sm);
  left: var(--spacer-sm);

  background: ${({ theme }) => theme.colors.media.background};
  border-radius: var(--radius-full);
  font: var(--font-12-16-semibold);
  cursor: pointer;

  visibility: hidden;
  transition: visibility 0.2s ease;

  z-index: 10;

  span {
    padding-right: 0.5rem;
    color: white;
  }

  svg {
    fill: white;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.media.backgroundHover};
  }
`;

const DeleteButton = styled.span`
  position: absolute;
  top: var(--spacer-sm);
  right: var(--spacer-sm);

  background: ${({ theme }) => theme.colors.media.background};
  border-radius: var(--radius-full);
  cursor: pointer;

  visibility: hidden;
  transition: visibility 0.2s ease;

  z-index: 10;

  svg {
    fill: white;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.media.backgroundHover};
  }

  svg {
    fill: white;
  }
`;

const SelectedFileWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  object-position: center center;

  border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: var(--radius-xl);

  overflow: hidden;

  &:hover ${ImgAddButton}, &:hover ${DeleteButton} {
    visibility: visible;
  }
`;

const PreviousButton = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: var(--spacer-sm);

  background: ${({ theme }) => theme.colors.media.background};

  border-radius: var(--radius-full);

  cursor: pointer;
  z-index: 10;

  &:hover {
    background: ${({ theme }) => theme.colors.media.backgroundHover};
  }

  svg {
    fill: white;
  }
`;

const NextButton = styled.span`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: var(--spacer-sm);

  background: ${({ theme }) => theme.colors.media.background};

  border-radius: var(--radius-full);

  cursor: pointer;
  z-index: 10;

  &:hover {
    background: ${({ theme }) => theme.colors.media.backgroundHover};
  }

  svg {
    fill: white;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius-xl);

  video:first-child {
    position: relative;
    object-fit: contain;

    width: 100%;
    height: 100%;
    border-radius: var(--radius-xl);
    z-index: 2;
  }

  > div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    background: black;
    object-fit: cover;

    z-index: 1;
    border-radius: var(--radius-xl);
    pointer-events: none;
  }
`;

const ImgCarouselWrapper = styled.div<{ $version: ItemVersion }>`
  position: relative;
  width: 100%;

  height: ${({ $version }) => ($version === 'view' ? 'auto' : '100%')};
  min-height: ${({ $version }) => ($version === 'view' ? '200px' : '0')};
  max-height: ${({ $version }) => ($version === 'view' ? '540px' : 'none')};

  overflow: hidden;
  border-radius: var(--radius-xl);

  border-color: ${({ $version, theme }) =>
    $version === 'view' ? theme.colors.neutral.borderWeak : 'transparent'};
`;

const ImgCarouselTrack = styled.ul<{
  $currentIndex: number;
  $totalItems: number;
}>`
  display: flex;
  width: ${({ $totalItems }) => `${$totalItems * 100}%`};
  height: 100%;

  transform: translateX(
    ${({ $currentIndex, $totalItems }) =>
      `-${($currentIndex * 100) / $totalItems}%`}
  );
  transition: transform 0.3s ease-in-out;
`;

const ImgCarouselItem = styled.li<{ $totalItems: number }>`
  position: relative;
  width: ${({ $totalItems }) => `${100 / $totalItems}%`};
  height: 100%;
  flex-shrink: 0;

  img:first-child {
    position: relative;
    object-fit: contain;

    width: auto;
    max-width: 100%;

    height: auto;
    max-height: 540px;

    border-radius: var(--radius-xl);
    z-index: 2;
  }

  img:nth-child(2) {
    position: absolute;
    filter: blur(24px);
    opacity: 0.3;
    width: 100%;
    height: 100%;

    object-fit: cover;

    z-index: 1;
    border-radius: var(--radius-xl);
  }
`;

const ImgCarouselItemV2 = styled.li<{ $totalItems: number }>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  width: ${({ $totalItems }) => `${100 / $totalItems}%`};
  height: 100%;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1;
    border-radius: var(--radius-xl);
  }

  img:first-child {
    position: relative;
    object-fit: contain;

    width: auto;
    max-width: 100%;

    height: auto;
    max-height: 540px;

    z-index: 2;
  }

  img:nth-child(2) {
    position: absolute;
    filter: blur(24px);
    opacity: 0.3;
    width: 100%;
    height: 100%;

    object-fit: cover;

    z-index: 1;
    border-radius: var(--radius-xl);
  }
`;

export default MediaCarousel;
