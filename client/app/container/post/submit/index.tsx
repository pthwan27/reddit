'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';
import { validationCheck } from '@/app/utils/validationCheck';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import IconButton from '@/app/components/common/button/iconButton';
import PostSubmitHeader from '@/app/components/post/submit/header';
import PostSubmitMain from '@/app/components/post/submit/main';
import RightSideBar from '@/app/components/sub/detail/rightSideBar';

import { useAuth } from '@/app/context/authContext';
import { Sub } from '@/app/types';

const PostSubmitContainer = ({ sub }: { sub: Sub }) => {
  const { user } = useAuth();
  const { selectedSub, setSelectedSub } = useSubStore();

  const router = useRouter();

  const [isTagLoading, setIsTagLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const titleValidation = useMemo(
    () => validationCheck(title, 'postTitle'),
    [title]
  );
  const contentValidation = useMemo(
    () => validationCheck(content, 'postContent'),
    [content]
  );

  const handleSubSelect = (sub: Sub) => {
    if (sub.id !== selectedSub?.id) {
      if (title.trim() || content.trim()) {
        const confirmed = window.confirm(
          '작성 중인 내용이 있습니다. 정말 다른 커뮤니티로 이동하시겠습니까?'
        );

        if (!confirmed) {
          return;
        }
      }

      setSelectedSub(sub);
      setIsTagLoading(true);

      setTimeout(() => {
        router.push(`/${sub.profileUser ? 'user' : 'r'}/${sub.slug}/submit`);
      }, 500);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    try {
      await clientAxiosInstance.post('/api/post/submit', {
        title,
        content,
        slug: selectedSub ? selectedSub.slug : sub.slug,
      });

      setTitle('');
      setContent('');
      setError('');

      router.replace(
        `/${selectedSub ? 'user' : 'r'}/${selectedSub ? selectedSub.slug : sub.slug}`
      );
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Create Sub failed:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    setTitle('');
    setContent('');
  }, [isTagLoading]);

  return (
    <GridWrapper>
      <PostSubmit>
        <PostSubmitHeader
          isTagLoading={isTagLoading}
          setIsTagLoading={setIsTagLoading}
          onSelectTag={handleSubSelect}
        />
        <PostSubmitMain
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
        <PostSubmitButtons>
          <IconButton
            value="제출하기"
            fontColor="white"
            radius="var(--radius-xl)"
            height="38px"
            width="fit-content"
            onClick={handleSubmit}
            disabled={
              titleValidation !== 'valid' || contentValidation !== 'valid'
            }
          />
        </PostSubmitButtons>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </PostSubmit>
      <RightSideBar sub={sub} />
    </GridWrapper>
  );
};

const GridWrapper = styled.div`
  display: grid;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 16px;

  gap: var(--spacer-lg);

  grid-template-columns: minmax(0, 1fr);

  & > :nth-child(2) {
    display: none;
  }
  @media (min-width: 768px) {
    & > :nth-child(2) {
      display: block;
    }

    grid-template-columns: minmax(0, 756px) minmax(0, 316px);
  }
`;
const PostSubmit = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  padding: 

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

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.global.error || '#ff6b6b'};
  font: var(--font-14);
  text-align: center;
  margin: var(--spacer-xs) 0;
`;

export default PostSubmitContainer;
