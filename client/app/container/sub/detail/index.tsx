'use client';

import { useEffect, useRef, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';

import { useUploadImage } from '@/app/hooks/useUploadImage';

import { useAuthStore } from '@/app/store/authStore';
import { usePostStore } from '@/app/store/postStore';
import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import ErrorMessage from '@/app/components/common/errorMessage';
import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';
import SubBanner from '@/app/components/sub/detail/banner';
import SubInfos from '@/app/components/sub/detail/info';

import { CustomError, Sub } from '@/app/types';

import RightSideBar from '../../../components/sub/rightSideBar';
import PostList from '../../post/list';

const SubDetail = ({ sub: initialSub }: { sub: Sub }) => {
  const { user } = useAuthStore();

  const [error, setError] = useState('');
  const { posts, loading, hasMore, fetchSubPosts, clearPosts } = usePostStore();
  const { handleSubscribe: subscribe } = useSubStore();
  const { uploadIconImage, uploadBannerImage } = useUploadImage();

  const [sub, setSub] = useState<Sub>(initialSub);

  const [iconImage, setIconImage] = useState<string>(sub.iconUrl || '');
  const [bannerImage, setBannerImage] = useState<string>(sub.bannerUrl || '');

  const iconFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const handleFileChange =
    (uploadType: 'icon' | 'banner') =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      try {
        const uploadFunctions = {
          icon: uploadIconImage,
          banner: uploadBannerImage,
        };

        const stateUpdater = {
          icon: setIconImage,
          banner: setBannerImage,
        };

        const newUrl = await uploadFunctions[uploadType]({
          slug: sub.slug,
          [uploadType]: file,
        });

        if (newUrl) {
          stateUpdater[uploadType](newUrl);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
      }
    };

  const handleClick = (uploadType: 'icon' | 'banner') => {
    if (uploadType === 'icon') {
      iconFileInputRef.current?.click();
    } else {
      bannerFileInputRef.current?.click();
    }
  };

  const handleSubscribe = async (sub: Sub) => {
    try {
      const isSubscribed = await subscribe(sub);

      setSub({
        ...sub,
        isSubscribed: isSubscribed,
      });
    } catch (err) {
      const error = err as Error;

      console.error('구독/구독취소 실패:', error.message);
    }
  };

  useEffect(() => {
    setIconImage(sub.iconUrl);
  }, [sub.iconUrl]);

  useEffect(() => {
    setBannerImage(sub.bannerUrl);
  }, [sub.bannerUrl]);

  useEffect(() => {
    (async () => {
      const { data } = await clientAxiosInstance.get(`/api/sub/${sub.slug}`);

      setSub(data);
    })();
  }, [user]);

  useEffect(() => {
    clearPosts();

    fetchSubPosts(sub.id);
  }, [sub.id, fetchSubPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && !loading && hasMore) {
          try {
            fetchSubPosts(sub.id);
          } catch (err) {
            const error = err as CustomError;
            console.error('Fetching posts failed:', error);

            setError(
              error.response?.data?.error || '게시물 불러오기를 실패했습니다.'
            );
          }
        }
      },
      {
        threshold: 0.5,
        rootMargin: '100px',
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore, sub.slug]);

  return (
    <SubDetailContainer>
      <Header>
        <SubBanner
          sub={sub}
          bannerImage={bannerImage}
          onEditClick={() => handleClick('banner')}
          isBanner={!!bannerImage}
        />

        <SubInfos
          sub={sub}
          iconImage={iconImage}
          onEditClick={() => handleClick('icon')}
          isIcon={!!iconImage}
          handleSubscribe={handleSubscribe}
        />
      </Header>
      <Main>
        <ObserverWrapper>
          <PostList posts={posts} />

          {loading && <LoadingSpinner />}

          {hasMore && !loading && (
            <div
              ref={observerRef}
              style={{ height: '20px', background: 'black' }}
            />
          )}
        </ObserverWrapper>
        <RightSideBar sub={sub} />
      </Main>

      <HiddenInput
        ref={bannerFileInputRef}
        type="file"
        onChange={handleFileChange('banner')}
      />
      <HiddenInput
        ref={iconFileInputRef}
        type="file"
        onChange={handleFileChange('icon')}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SubDetailContainer>
  );
};

const SubDetailContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: var(--spacer-sm);

  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  width: 100%;

  @media (min-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);

  & > :nth-child(2) {
    display: none;
  }

  gap: var(--spacer-lg);

  @media (min-width: 960px) {
    & > :nth-child(1) {
      grid-template-columns: minmax(0, 756px) minmax(0, 316px);
    }
  }
`;

const ObserverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-sm);
`;

const HiddenInput = styled.input`
  display: none;
`;
export default SubDetail;
