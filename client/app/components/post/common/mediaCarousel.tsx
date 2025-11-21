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
  noBorderRadiusOnMobile?: boolean;
}
const MediaCarousel = ({
  mediaUrls,
  curIdx,
  setCurIdx,
  onAddMore,
  onRemove,
  mediaType = 'image',
  version = 'submit',
  noBorderRadiusOnMobile = false,
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
    <SelectedFileWrapper
      $version={version}
      $noBorderRadiusOnMobile={noBorderRadiusOnMobile}
    >
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
            $currentIndex={curIdx}
            $totalItems={mediaUrls.length}
            $version={version}
          >
            {mediaUrls.map((file, idx) => (
              <ImgCarouselItem
                key={idx}
                $totalItems={mediaUrls.length}
                $version={version}
              >
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
          </ImgCarouselTrack>
        </ImgCarouselWrapper>
      ) : (
        <VideoWrapper $version={version}>
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

const SelectedFileWrapper = styled.div<{
  $version: ItemVersion;
  $noBorderRadiusOnMobile: boolean;
}>`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  object-position: center center;

  border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.border};

  border-radius: ${({ $noBorderRadiusOnMobile }) =>
    $noBorderRadiusOnMobile ? 0 : 'var(--radius-xl)'};

  overflow: hidden;

  &:hover ${ImgAddButton}, &:hover ${DeleteButton} {
    visibility: visible;
  }

  @media (min-width: 768px) {
    border-radius: var(--radius-xl);
  }
`;

const VideoWrapper = styled.div<{ $version: ItemVersion }>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 100%;
  height: 100%;

  overflow: hidden;
  padding: var(--spacer-lg) 0;

  video:first-child {
    position: relative;
    object-fit: contain;

    width: 100%;
    height: 100%;
    max-height: inherit;

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
    pointer-events: none;
  }
`;

const ImgCarouselWrapper = styled.div<{ $version: ItemVersion }>`
  width: 100%;
  height: 100%;

  border-color: ${({ $version, theme }) =>
    $version === 'view' ? theme.colors.neutral.borderWeak : 'transparent'};
`;

const ImgCarouselTrack = styled.ul<{
  $currentIndex: number;
  $totalItems: number;
  $version: ItemVersion;
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

const ImgCarouselItem = styled.li<{
  $totalItems: number;
  $version: ItemVersion;
}>`
  position: relative;
  width: ${({ $totalItems }) => `${100 / $totalItems}%`};
  height: auto;
  max-height: 540px;

  aspect-ratio: auto 1/1;

  flex-shrink: 0;

  img:first-child {
    position: relative;
    object-fit: contain;

    width: auto;
    max-width: 100%;

    height: auto;
    max-height: 540px;

    aspect-ratio: auto 1/1;

    z-index: 2;
  }

  img:nth-child(2) {
    position: absolute;
    filter: blur(32px);
    opacity: 0.7;

    width: auto;

    height: auto;
    max-height: 540px;

    aspect-ratio: auto 1/1;

    object-fit: cover;

    z-index: 1;
  }
`;

export default MediaCarousel;
