import { useState } from 'react';

import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/input/placeholderInput';
import RichTextEditor from '@/app/components/common/input/richTextEditor';

import ImageUpload from './mediaUpload';

type PostType = 'text' | 'media' | 'link';

export interface PostSubmitMainProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  activeTab: PostType;
  setActiveTab: (tab: PostType) => void;
  mediaFiles: File[];
  setMediaFiles: (files: File[]) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
}

const PostSubmitMain = ({
  title,
  setTitle,
  content,
  setContent,
  activeTab,
  setActiveTab,
  mediaFiles,
  setMediaFiles,
  linkUrl,
  setLinkUrl,
}: PostSubmitMainProps) => {
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const renderingTap = () => {
    switch (activeTab) {
      case 'media':
        return (
          <ImageUpload
            mediaFiles={mediaFiles}
            setMediaFiles={setMediaFiles}
            imgUrls={imgUrls}
            setImgUrls={setImgUrls}
          />
        );
      case 'link':
        return (
          <PlaceHolderInput
            variant="outlined"
            value={linkUrl}
            type="link"
            label="링크"
            onChange={(e) => setLinkUrl(e.target.value)}
            bgColor="transparent"
            hoverColor="neutralHover"
            borderColor="naturalBorder"
            hoverBorderColor="neutralBorderHover"
            focusBorderColor="secondaryLight"
            lineWidth="sm"
            required={true}
          />
        );
      case 'text':
      default:
        return <></>;
    }
  };
  return (
    <StyledPostSubmitMain>
      <RenderingTabSelector>
        <TabList>
          <Tab
            $isActive={activeTab === 'text'}
            onClick={() => setActiveTab('text')}
          >
            <span>텍스트</span>
            <span />
          </Tab>
          <Tab
            $isActive={activeTab === 'media'}
            onClick={() => setActiveTab('media')}
          >
            <span>이미지 및 동영상</span>
            <span />
          </Tab>
          <Tab
            $isActive={activeTab === 'link'}
            onClick={() => setActiveTab('link')}
          >
            <span>링크</span>
            <span />
          </Tab>
        </TabList>
      </RenderingTabSelector>
      <MainWrapper>
        <PlaceHolderInput
          variant="outlined"
          value={title}
          type="text"
          label="제목"
          onChange={(e) => setTitle(e.target.value)}
          bgColor="transparent"
          hoverColor="neutralHover"
          borderColor="neutralBorder"
          hoverBorderColor="neutralBorderHover"
          focusBorderColor="secondaryLight"
          lineWidth="sm"
          required={true}
        />

        {renderingTap()}
        <RichTextEditor
          content={content}
          onChange={setContent}
          placeholder="내용을 입력하세요"
        />
      </MainWrapper>
    </StyledPostSubmitMain>
  );
};

const StyledPostSubmitMain = styled.main`
  display: flex;
  flex-direction: column;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-lg);

  padding: var(--spacer-md);
`;

const RenderingTabSelector = styled.div`
  @media (min-width: 768px) {
    margin-left: var(--spacer-md);
  }
`;

const TabList = styled.ul`
  display: flex;
`;

const Tab = styled.li<{ $isActive?: boolean }>`
  display: inline-flex;
  flex-direction: column;
  gap: var(--spacer-sm);
  cursor: pointer;

  align-items: center;
  justify-content: flex-end;

  height: var(--rem-48);

  padding: 0 calc(var(--spacer-md) - 2px);

  font: var(--font-14-20-semibold);

  span:nth-child(2) {
    width: 100%;
    height: var(--rem-4);

    background: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.default.primary || '#115BCA' : 'transparent'};

    border-radius: var(--radius-full);
  }

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }
`;

export default PostSubmitMain;
