'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';
import { validationCheck } from '@/app/utils/validationCheck';

import { useAuthStore } from '@/app/store/authStore';
import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import IconButton from '@/app/components/common/button/iconButton';
import ErrorMessage from '@/app/components/common/errorMessage';
import PostSubmitHeader from '@/app/components/post/submit/header';
import PostSubmitMain from '@/app/components/post/submit/main';
import RightSideBar from '@/app/components/sub/rightSideBar';

import { Sub } from '@/app/types';

type PostType = 'text' | 'media' | 'link';

const PostSubmit = ({ sub }: { sub: Sub }) => {
  const { user } = useAuthStore();
  const { selectedSub, setSelectedSub } = useSubStore();

  const router = useRouter();

  const [isTagLoading, setIsTagLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState<PostType>('text');
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [error, setError] = useState('');

  const titleValidation = useMemo(
    () => validationCheck(title, 'postTitle'),
    [title]
  );
  const contentValidation = useMemo(
    () =>
      validationCheck(content.replace(/<[^>]*>/g, '').trim(), 'postContent'),
    [content]
  );

  const handleSelect = (sub: Sub) => {
    setSearchTerm('');
    setIsSearching(false);
    setIsTagLoading(false);
    if (sub.id === selectedSub?.id) {
      return;
    }

    if (sub.id !== selectedSub?.id) {
      if (title.trim() || content.trim()) {
        if (typeof window === 'undefined') return;

        const confirmed = window.confirm(
          '작성 중인 내용이 있습니다. 정말 다른 커뮤니티로 이동하시겠습니까?'
        );

        if (!confirmed) {
          return;
        }
      }

      setIsTagLoading(true);
      setSelectedSub(sub);
      setMediaFiles([]);
      setLinkUrl('');

      router.push(`/r/${sub.slug}/submit`);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    try {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('content', content);
      formData.append('postType', activeTab);
      formData.append('slug', selectedSub ? selectedSub.slug : sub.slug);

      switch (activeTab) {
        case 'media':
          if (mediaFiles.length > 0) {
            if (mediaFiles[0].type.startsWith('video/')) {
              formData.append('images', mediaFiles[0]);
              formData.append('mediaType', 'video');
            } else {
              mediaFiles.forEach((file) => {
                formData.append('images', file);
              });
              formData.append('mediaType', 'image');
            }
          }
          break;
        case 'link':
          formData.append('linkUrl', linkUrl);
          break;
        default:
          break;
      }

      await clientAxiosInstance.post('/api/post/submit', formData);

      setTitle('');
      setContent('');
      setMediaFiles([]);
      setLinkUrl('');
      setError('');

      if (typeof window === 'undefined') return;

      window.location.href = `/r/${selectedSub ? selectedSub.slug : sub.slug}`;
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Create Sub failed:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!selectedSub) {
      setSelectedSub(sub);
    }
  }, [sub, selectedSub, setSelectedSub]);

  return (
    <GridWrapper>
      <PostSubmitContainer>
        <PostSubmitHeader
          isTagLoading={isTagLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          handleSelect={handleSelect}
        />
        <PostSubmitMain
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
        />
        <PostSubmitButtons>
          <IconButton
            value="제출하기"
            fontColor="white"
            radius="var(--radius-xl)"
            height="38px"
            width="fit-content"
            variant="primary"
            onClick={handleSubmit}
            disabled={
              !(titleValidation === 'valid' && contentValidation === 'valid')
            }
          />
        </PostSubmitButtons>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </PostSubmitContainer>
      <RightSideBar sub={sub} />
    </GridWrapper>
  );
};

const GridWrapper = styled.div`
  display: grid;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  gap: var(--spacer-lg);

  grid-template-columns: minmax(0, 1fr);

  & > :nth-child(2) {
    display: none;
  }

  @media (min-width: 1200px) {
  }

  @media (min-width: 768px) {
    & > :nth-child(2) {
      display: block;
    }

    grid-template-columns: minmax(0, 756px) minmax(0, 316px);
  }
`;

const PostSubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  margin: 0 auto;

  @media (min-width: 1200px) {
    max-width: 1120px;
  }
`;

const PostSubmitButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 var(--spacer-md);

  margin-top: -8px;
`;

export default PostSubmit;
