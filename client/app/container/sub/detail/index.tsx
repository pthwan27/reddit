'use client';

import { useEffect, useRef, useState } from 'react';

import { useUploadImage } from '@/app/hooks/useUploadImage';

import { usePostStore } from '@/app/store/postStore';
import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import LoadingSpinner from '@/app/components/common/loadingSpinner';

import SubBanner from '@/app/container/sub/detail/banner';
import SubInfos from '@/app/container/sub/detail/info';

import { Sub } from '@/app/types';

import RightSideBar from '../../../components/sub/detail/rightSideBar';
import PostListContainer from '../../post/list';

const SubDetailContainer = ({ type, sub }: { type: string; sub: Sub }) => {
  const { uploadIconImage, uploadBannerImage } = useUploadImage();
  const [iconImage, setIconImage] = useState<string>(sub.iconUrl);
  const [bannerImage, setBannerImage] = useState<string>(sub.bannerUrl);

  const { posts, loading, hasMore, fetchPosts, clearPosts } = usePostStore();
  const { selectedSub } = useSubStore();

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

  useEffect(() => {
    setIconImage(sub.iconUrl);
  }, [sub.iconUrl]);

  useEffect(() => {
    setBannerImage(sub.bannerUrl);
  }, [sub.bannerUrl]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          fetchPosts(sub.slug);
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [loading, hasMore, sub.slug, fetchPosts]);

  useEffect(() => {
    clearPosts();

    fetchPosts(sub.slug);

    return () => {
      clearPosts();
    };
  }, [selectedSub, sub.slug, fetchPosts, clearPosts]);

  return (
    <SubDetail>
      <Header>
        <SubBanner
          sub={sub}
          bannerImage={bannerImage}
          onEditClick={() => handleClick('banner')}
          isBanner={!!bannerImage}
        />

        <SubInfos
          type={type}
          sub={sub}
          iconImage={iconImage}
          onEditClick={() => handleClick('icon')}
          isIcon={!!iconImage}
        />
      </Header>
      <Main>
        <ObserverWrapper>
          {loading ? <LoadingSpinner /> : <PostListContainer posts={posts} />}

          <div ref={observerRef} style={{ height: '1px' }} />
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
    </SubDetail>
  );
};

const SubDetail = styled.div`
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

const Main = styled.main`
  display: grid;

  grid-template-columns: minmax(0, 756px) minmax(0, 316px);

  gap: var(--spacer-lg);

  @media (max-width: 959px) {
    grid-template-columns: 1fr;
    & > :nth-child(1) {
    }

    & > :nth-child(2) {
      display: none;
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
export default SubDetailContainer;
